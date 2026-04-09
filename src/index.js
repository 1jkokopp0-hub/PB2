const { Client, GatewayIntentBits, Partials } = require("discord.js");
const config = require("./config");
const { validateConfig } = require("./deployChecks");
const { createManager } = require("./music/manager");

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
client.manager = createManager(client);

client.once("ready", () => require("./events/ready")(client));
client.on("messageCreate", (message) => require("./events/messageCreate")(client, message));
client.on("voiceStateUpdate", (oldState, newState) => require("./events/voiceStateUpdate")(client, oldState, newState));

client.login(config.token);