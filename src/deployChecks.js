function validateConfig(config) {
  const required = [
    ["BOT_TOKEN", config.token],
    ["DEFAULT_GUILD_ID", config.guildId],
    ["AUTO_JOIN_VOICE_CHANNEL_ID", config.autoJoinVoiceChannelId],
    ["VOICE_TEXT_CHANNEL_ID", config.voiceTextChannelId],
    ["LAVALINK_HOST", config.lavalink.host],
    ["LAVALINK_PASSWORD", config.lavalink.password]
  ];

  const missing = required.filter(([, value]) => !value).map(([key]) => key);
  if (missing.length) {
    throw new Error(`Missing env vars: ${missing.join(", ")}`);
  }
}

module.exports = { validateConfig };