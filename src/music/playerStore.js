const store = new Map();

function ensureGuildState(guildId) {
  if (!store.has(guildId)) {
    store.set(guildId, {
      boundTextChannelId: null,
      boundVoiceChannelId: null,
      autoplay: false,
      repeat: "off",
      lastTracks: []
    });
  }
  return store.get(guildId);
}

module.exports = { ensureGuildState };