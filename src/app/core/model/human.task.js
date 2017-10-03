"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var activity_1 = require("./activity");
var HumanTask = (function (_super) {
    __extends(HumanTask, _super);
    function HumanTask(humanTaskData) {
        return _super.call(this, humanTaskData) || this;
    }
    return HumanTask;
}(activity_1.Activity));
exports.HumanTask = HumanTask;
