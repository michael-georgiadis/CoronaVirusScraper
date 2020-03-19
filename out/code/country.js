"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Country = /** @class */ (function () {
    function Country(countryName, totalCases, newCases, totalDeaths, newDeaths, totalRecovered, activeCases, critical, per1m) {
        this.countryName = countryName;
        this.totalCases = totalCases;
        this.newCases = newCases;
        this.totalDeaths = totalDeaths;
        this.newDeaths = newDeaths;
        this.totalRecovered = totalRecovered;
        this.activeCases = activeCases;
        this.critical = critical;
        this.per1m = per1m;
    }
    return Country;
}());
exports.Country = Country;
//# sourceMappingURL=country.js.map