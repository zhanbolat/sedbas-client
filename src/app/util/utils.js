"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = (function () {
    function Utils() {
    }
    Utils.prototype.getDateValue = function (bonitaDateValue) {
        return new Date(bonitaDateValue.substr(0, 10) + 'T' + bonitaDateValue.substr(11));
    };
    return Utils;
}());
exports.Utils = Utils;
