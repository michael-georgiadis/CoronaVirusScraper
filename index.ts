import { CoronaScraper } from './code/scraper';

async function main(): Promise<void> {
    const scraper = new CoronaScraper("https://www.worldometers.info/coronavirus/");
    await scraper.scrapeHtml();
    await scraper.createCsv();
}

main()
