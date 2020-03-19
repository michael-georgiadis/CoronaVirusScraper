export class Country {
    constructor(public countryName: string, public totalCases: number, public newCases: number, public totalDeaths: number,
        public newDeaths: number, public totalRecovered: number, public activeCases: number,
        public critical: number, public per1m: number) { }
}