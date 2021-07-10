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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const util_1 = require("../core/util");
var questionPrompt = [
    {
        question: "Select gear to caphras",
        options: [
            "Dim Tree Spirit's Armor",
            "Main Weapon (Kzarka)",
            "Awakening Weapon (Dande)",
            "Kutum Offhand",
            "Nouver Offhand",
            "Boss Armor (Any, except Dim Tree)",
            "Green Armor (Any)",
            "Green Offhand (Any)",
        ],
        answers: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    {
        question: "Current Enhancement Level ?",
        options: ["TRI (III)", "TET (IV)", "PEN (V)"],
        answers: [1, 2, 3],
    },
    {
        question: "Current Caphras Level ?",
        options: ["Range from 0 - 20"],
        answers: new Array(21).fill("hola").map((_, id) => id),
    },
    {
        question: "Target Caphras Level ?",
        options: ["Range from 0 - 20"],
        answers: new Array(21).fill("hola").map((_, id) => id),
    },
];
var filterGear = (response) => questionPrompt[0].answers.some((answer) => `?>${answer.toString().toLowerCase()}` ==
    response.content.toLowerCase().replace(/ /g, ""));
var filterEnhancement = (response) => questionPrompt[1].answers.some((answer) => `?>${answer.toString().toLowerCase()}` == response.content.toLowerCase());
var filterCaphras = (response, id) => questionPrompt[id].answers.some((answer) => `?>${answer.toString().toLowerCase()}` ==
    response.content.toLowerCase().replace(/ /g, ""));
const caphras = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const messages = questionPrompt.map((question) => {
        let embedMessage = new discord_js_1.MessageEmbed();
        embedMessage.setTitle(question.question);
        embedMessage.setDescription(question.options.map((option, id) => `${id + 1}. ${option}`));
        return embedMessage;
    });
    let currentGear = {};
    try {
        yield message.delete();
        const gearMessage = yield message.channel.send(messages[0]);
        const gearReply = yield gearMessage.channel.awaitMessages(filterGear, {
            max: 1,
            time: 30000,
            errors: ["time"],
        });
        currentGear.gear = util_1.parseArg(gearReply.first().content);
        yield ((_a = gearReply.first()) === null || _a === void 0 ? void 0 : _a.delete());
        const enhancementMessage = yield gearMessage.edit(messages[1]);
        const enhancementReply = yield enhancementMessage.channel.awaitMessages(filterEnhancement, { max: 1, time: 30000, errors: ["time"] });
        currentGear.enhancementLv = util_1.parseArg(enhancementReply.first().content);
        yield ((_b = enhancementReply.first()) === null || _b === void 0 ? void 0 : _b.delete());
        const currentCaphrasMessage = yield gearMessage.edit(messages[2]);
        const currentCaphrasReply = yield currentCaphrasMessage.channel.awaitMessages((response) => filterCaphras(response, 2), { max: 1, time: 30000, errors: ["time"] });
        currentGear.currentCaphras = util_1.parseArg(currentCaphrasReply.first().content);
        yield ((_c = currentCaphrasReply.first()) === null || _c === void 0 ? void 0 : _c.delete());
        const targetCaphrasMessage = yield gearMessage.edit(messages[3]);
        const targetCaphrasReply = yield targetCaphrasMessage.channel.awaitMessages((response) => filterCaphras(response, 3), { max: 1, time: 30000, errors: ["time"] });
        currentGear.targetCaphras = util_1.parseArg(targetCaphrasReply.first().content);
        yield ((_d = targetCaphrasReply.first()) === null || _d === void 0 ? void 0 : _d.delete());
        let returnMessage = new discord_js_1.MessageEmbed();
        returnMessage.setTitle('Caphras');
        returnMessage.setDescription(message.author.toString());
        returnMessage.addFields({
            name: 'Gear',
            value: currentGear.gear
        }, {
            name: 'Enhancement Level',
            value: currentGear.enhancementLv
        }, {
            name: 'Current Caphras Level',
            value: currentGear.currentCaphras
        }, {
            name: 'Target Caphras Level',
            value: currentGear.targetCaphras
        });
        yield gearMessage.edit(returnMessage);
    }
    catch (e) {
        console.error(e);
    }
});
exports.default = caphras;
//# sourceMappingURL=caphras.js.map