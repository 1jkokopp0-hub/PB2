const { EmbedBuilder } = require("discord.js");
const config = require("../config");

function embed(title, description) {
  return new EmbedBuilder().setColor(config.embedColor).setTitle(title).setDescription(description).setTimestamp();
}

module.exports = {
  ok: (t) => embed("تم", `✅ ${t}`),
  error: (t) => embed("خطأ", `❌ ${t}`),
  music: (title, t) => embed(title, `🎵 ${t}`),
  info: embed
};