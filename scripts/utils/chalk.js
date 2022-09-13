"use strict";
exports.__esModule = true;
exports.printGray = exports.printYellow = exports.printGreen = exports.printBlue = exports.printRed = void 0;
var chalk_1 = require("chalk");
var printRed = function (text) {
    console.log(chalk_1["default"].red(text));
};
exports.printRed = printRed;
var printBlue = function (text) {
    console.log(chalk_1["default"].blue(text));
};
exports.printBlue = printBlue;
var printGreen = function (text) {
    console.log(chalk_1["default"].green(text));
};
exports.printGreen = printGreen;
var printYellow = function (text) {
    console.log(chalk_1["default"].yellow(text));
};
exports.printYellow = printYellow;
var printGray = function (text) {
    console.log(chalk_1["default"].gray(text));
};
exports.printGray = printGray;
