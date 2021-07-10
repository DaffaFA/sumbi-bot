"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const SumbiBot_1 = __importDefault(require("./core/SumbiBot"));
let bot = new SumbiBot_1.default();
bot.init();
//# sourceMappingURL=bootstrap.js.map