const { Client, GatewayIntentBits, Partials } = require("discord.js");
const config = require("./config");
const { validateConfig } = require("./deployChecks");

validateConfig(config);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ],
  partials: [Partials.Channel]
});

client.config = config;
client.once("clientReady", () => require("./events/ready")(client));
client.on("messageCreate", (message) => require("./events/messageCreate")(client, message));
client.login(config.token);