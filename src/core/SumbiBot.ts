import Discord from "discord.js";
import caphras from "../scripts/caphras";

class SumbiBot {
  static prefix: string = "?>";  
  public client: Discord.Client;

  constructor() {
    this.client = new Discord.Client();
  }

  init = () => {
    this.onMessage();
    this.client.login(process.env.DISCORD_TOKEN);
  };

  onMessage = () => {
    this.client.on("message", (message) => {
      if (!message.content.startsWith(SumbiBot.prefix) || message.author.bot)
        return;

      const args = message.content.slice(SumbiBot.prefix.length).trim().split(" ");
      const command = args?.shift()?.toLowerCase();
      
      switch (command) {
        case "caphras":
          caphras(message);
          break;

        default:
          // message.channel.send(
          //   `menjalankan command : ${command}\nDengan parameter : ${args}`
          // );
          break;
      }
    });
  };
}

export default SumbiBot;