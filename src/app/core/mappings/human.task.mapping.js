"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var human_task_1 = require("../model/human.task");
var HumanTaskMapping = (function () {
    function HumanTaskMapping() {
    }
    HumanTaskMapping.prototype.mapResponse = function (res) {
        var humanTaskData = new human_task_1.HumanTask(res.json());
        return humanTaskData;
    };
    HumanTaskMapping.prototype.mapResponseArray = function (res) {
        var humanTaskDataArray = [];
        var bodyArray = res.json();
        for (var _i = 0, bodyArray_1 = bodyArray; _i < bodyArray_1.length; _i++) {
            var body = bodyArray_1[_i];
            humanTaskDataArray.push(new human_task_1.HumanTask(body));
        }
        return humanTaskDataArray;
    };
    return HumanTaskMapping;
}());
exports.HumanTaskMapping = HumanTaskMapping;
