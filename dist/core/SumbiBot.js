"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const caphras_1 = __importDefault(require("../scripts/caphras"));
class SumbiBot {
    constructor() {
        this.init = () => {
            this.onMessage();
            this.client.login(process.env.DISCORD_TOKEN);
        };
        this.onMessage = () => {
            this.client.on("message", (message) => {
                var _a;
                if (!message.content.startsWith(SumbiBot.prefix) || message.author.bot)
                    return;
                const args = message.content.slice(SumbiBot.prefix.length).trim().split(" ");
                const command = (_a = args === null || args === void 0 ? void 0 : args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                switch (command) {
                    case "caphras":
                        caphras_1.default(message);
                        break;
                    default:
                        break;
                }
            });
        };
        this.client = new discord_js_1.default.Client();
    }
}
SumbiBot.prefix = "?>";
exports.default = SumbiBot;
//# sourceMappingURL=SumbiBot.js.map