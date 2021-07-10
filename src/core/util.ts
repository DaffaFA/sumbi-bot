import SumbiBot from "./SumbiBot";

export const parseArg = (arg: string) => arg.slice(SumbiBot.prefix.length).replace(/ /g, '');