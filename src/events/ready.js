const { autoJoin } = require("../music/autoJoin");

module.exports = async (client) => {
  console.log(`[BOT] Logged in as ${client.user.tag}`);
  await client.manager.init(client.user.id);
  await autoJoin(client).catch(console.error);
};