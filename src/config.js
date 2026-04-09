require("dotenv").config();

module.exports = {
  token: process.env.BOT_TOKEN,
  prefix: process.env.BOT_PREFIX || "!",
  guildId: process.env.DEFAULT_GUILD_ID,
  autoJoinVoiceChannelId: process.env.AUTO_JOIN_VOICE_CHANNEL_ID,
  voiceTextChannelId: process.env.VOICE_TEXT_CHANNEL_ID,
  ownerIds: (process.env.OWNER_IDS || "").split(",").map(x => x.trim()).filter(Boolean),
  embedColor: Number(process.env.EMBED_COLOR || "0x5865F2"),
  lavalink: {
    host: process.env.LAVALINK_HOST,
    port: Number(process.env.LAVALINK_PORT || 2333),
    password: process.env.LAVALINK_PASSWORD,
    secure: String(process.env.LAVALINK_SECURE).toLowerCase() === "true"
  },
  defaultVolume: Math.max(1, Math.min(200, Number(process.env.DEFAULT_VOLUME || 70))),
  searchSource: process.env.SEARCH_SOURCE || "ytsearch"
};