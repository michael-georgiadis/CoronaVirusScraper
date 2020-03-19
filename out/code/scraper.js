"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = __importDefault(require("cheerio"));
var country_1 = require("./country");
var csv_writer_1 = require("csv-writer");
var CoronaScraper = /** @class */ (function () {
    function CoronaScraper(url) {
        this.url = url;
        this.dailyData = [];
        this.currentDate = new Date();
    }
    CoronaScraper.prototype.scrapeHtml = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default(this.url)];
                    case 1:
                        response = _a.sent();
                        this.getData(cheerio_1.default.load(response.data));
                        return [2 /*return*/];
                }
            });
        });
    };
    CoronaScraper.prototype.getData = function ($) {
        var _this = this;
        $("#main_table_countries_today > tbody > tr").each(function (index, element) {
            var tds = $(element).find('td');
            var values = [];
            var countryName = $(tds[0]).text();
            for (var propertyIndex = 1; propertyIndex < 9; propertyIndex++) {
                var htmlText = $(tds[propertyIndex]).text();
                values.push(htmlText == null || htmlText === ""
                    ? 0
                    : Number(propertyIndex === 1 || propertyIndex === 3
                        ? htmlText.trim().replace("+", "").replace(",", "")
                        : htmlText.trim().replace(",", "")));
            }
            _this.dailyData.push(new country_1.Country(countryName, values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]));
            _this.dailyData.sort(function (a, b) { return (a.totalCases > b.totalCases) ? -1 : 1; });
        });
    };
    CoronaScraper.prototype.createCsv = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentDate, csvWriter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentDate = new Date();
                        csvWriter = csv_writer_1.createObjectCsvWriter({
                            path: "./csv/countries-" + this.stringify(this.currentDate.getDate()) + "-" + this.stringify(this.currentDate.getMonth()) + ".csv",
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
                        return [4 /*yield*/, csvWriter.writeRecords(this.dailyData)];
                    case 1:
                        _a.sent();
                        console.log("...Done!");
                        return [2 /*return*/];
                }
            });
        });
    };
    CoronaScraper.prototype.stringify = function (dateVariable) {
        if (dateVariable < 10)
            return "0" + dateVariable;
        return dateVariable.toString();
    };
    return CoronaScraper;
}());
exports.CoronaScraper = CoronaScraper;
//# sourceMappingURL=scraper.js.map