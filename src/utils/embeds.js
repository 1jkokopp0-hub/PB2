const { EmbedBuilder } = require("discord.js");
const config = require("../config");

function baseEmbed(title, description) {
  return new EmbedBuilder()
    .setColor(config.embedColor)
    .setTitle(title)
    .setDescription(description)
    .setTimestamp();
}

function errorEmbed(text) {
  return baseEmbed("خطأ", `❌ ${text}`);
}

function okEmbed(title, text) {
  return baseEmbed(title, `✅ ${text}`);
}

function musicEmbed(title, text) {
  return baseEmbed(title, `🎵 ${text}`);
}

module.exports = { baseEmbed, errorEmbed, okEmbed, musicEmbed };