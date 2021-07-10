"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArg = void 0;
const SumbiBot_1 = __importDefault(require("./SumbiBot"));
exports.parseArg = (arg) => arg.slice(SumbiBot_1.default.prefix.length).replace(/ /g, '');
//# sourceMappingURL=util.js.map