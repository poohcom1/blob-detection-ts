"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Region = exports.Rect = void 0;
var Rect_1 = require("./Rect");
Object.defineProperty(exports, "Rect", { enumerable: true, get: function () { return __importDefault(Rect_1).default; } });
var Region_1 = require("./Region");
Object.defineProperty(exports, "Region", { enumerable: true, get: function () { return __importDefault(Region_1).default; } });
const MSER_1 = __importDefault(require("./MSER"));
exports.default = MSER_1.default;
