import { Message, MessageEmbed } from "discord.js";
import { parseArg } from "../core/util";

type caphrasPrompt = {
  gear?: string;
  enhancementLv?: string;
  currentCaphras?: string;
  targetCaphras?: string;
}

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

var filterGear = (response: Message) =>
  questionPrompt[0].answers.some(
    (answer) =>
      `?>${answer.toString().toLowerCase()}` ==
      response.content.toLowerCase().replace(/ /g, "")
  );

var filterEnhancement = (response: Message) =>
  questionPrompt[1].answers.some(
    (answer) =>
      `?>${answer.toString().toLowerCase()}` == response.content.toLowerCase()
  );

var filterCaphras = (response: Message, id: number) =>
  questionPrompt[id].answers.some(
    (answer) =>
      `?>${answer.toString().toLowerCase()}` ==
      response.content.toLowerCase().replace(/ /g, "")
  );

const caphras = async (message: Message) => {
  const messages = questionPrompt.map((question) => {
    let embedMessage = new MessageEmbed();
    embedMessage.setTitle(question.question);
    embedMessage.setDescription(
      question.options.map((option, id) => `${id + 1}. ${option}`)
    );

    return embedMessage;
  });

  let currentGear: caphrasPrompt = {};

  try {
    await message.delete();

    const gearMessage = await message.channel.send(messages[0]);
    const gearReply = await gearMessage.channel.awaitMessages(filterGear, {
      max: 1,
      time: 30000,
      errors: ["time"],
    });
    currentGear.gear = parseArg(gearReply.first()!.content);
    await gearReply.first()?.delete();

    const enhancementMessage = await gearMessage.edit(messages[1]);
    const enhancementReply = await enhancementMessage.channel.awaitMessages(
      filterEnhancement,
      { max: 1, time: 30000, errors: ["time"] }
    );
    currentGear.enhancementLv = parseArg(enhancementReply.first()!.content);
    await enhancementReply.first()?.delete();

    const currentCaphrasMessage = await gearMessage.edit(messages[2]);
    const currentCaphrasReply =
      await currentCaphrasMessage.channel.awaitMessages(
        (response) => filterCaphras(response, 2),
        { max: 1, time: 30000, errors: ["time"] }
      );
    currentGear.currentCaphras = parseArg(currentCaphrasReply.first()!.content)
    await currentCaphrasReply.first()?.delete();

    const targetCaphrasMessage = await gearMessage.edit(messages[3]);
    const targetCaphrasReply = await targetCaphrasMessage.channel.awaitMessages(
      (response) => filterCaphras(response, 3),
      { max: 1, time: 30000, errors: ["time"] }
    );
    currentGear.targetCaphras = parseArg(targetCaphrasReply.first()!.content)
    await targetCaphrasReply.first()?.delete();


    let returnMessage = new MessageEmbed();
    returnMessage.setTitle('Caphras');
    returnMessage.setDescription(message.author.toString());
    returnMessage.addFields(
      {
        name: 'Gear',
        value: currentGear.gear
      },
      {
        name: 'Enhancement Level',
        value: currentGear.enhancementLv
      },
      {
        name: 'Current Caphras Level',
        value: currentGear.currentCaphras
      },
      {
        name: 'Target Caphras Level',
        value: currentGear.targetCaphras
      },
    )
    await gearMessage.edit(returnMessage);

  } catch (e) {
    console.error(e);
  }
};

export default caphras;
