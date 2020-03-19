import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import cheerio from 'cheerio';
import { Country } from './country';
import { createObjectCsvWriter } from "csv-writer";

export class CoronaScraper {

    dailyData: Country[] = [];
    currentDate = new Date();


    constructor(private url: string) { }


    public async scrapeHtml(): Promise<void> {
        const response = await axios(this.url)
        this.getData(cheerio.load(response.data));
    }

    private getData($: CheerioStatic): void {

        $("#main_table_countries_today > tbody > tr").each((index, element) => {
            const tds = $(element).find('td');

            const values: number[] = [];

            const countryName = $(tds[0]).text();

            for (let propertyIndex: number = 1; propertyIndex < 9; propertyIndex++) {
                let htmlText: string = $(tds[propertyIndex]).text();
                values.push(
                    htmlText == null || htmlText === ""
                        ? 0
                        : Number(
                            propertyIndex === 1 || propertyIndex === 3
                                ? htmlText.trim().replace("+", "").replace(",", "")
                                : htmlText.trim().replace(",", "")));

            }
            this.dailyData.push(new Country(countryName, values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]));
            this.dailyData.sort((a, b) => (a.totalCases > b.totalCases) ? -1 : 1);
        });
    }

    public async createCsv(): Promise<void> {

        const currentDate = new Date();

        const csvWriter = createObjectCsvWriter({
            path: `./csv/countries-${this.stringify(this.currentDate.getDate())}-${this.stringify(this.currentDate.getMonth())}.csv`,
            header: [
                { id: 'countryName', title: "Country" },
                { id: 'totalCases', title: "Total Cases" },
                { id: 'newCases', title: 'New Cases' },
                { id: 'totalDeaths', title: "Total Deaths" },
                { id: "newDeaths", title: "New Deaths" },
                { id: "totalRecovered", title: "Total Recovered" },
                { id: "activeCases", title: "Active Cases" },
                { id: "critical", title: "Critical" },
                { id: "per1m", title: "Tot Cases/1M pop" }
            ]
        });

        await csvWriter.writeRecords(this.dailyData);

        console.log("...Done!");
    }

    private stringify(dateVariable: number): string {
        if (dateVariable < 10)
            return `0${dateVariable}`

        return dateVariable.toString();
    }
}