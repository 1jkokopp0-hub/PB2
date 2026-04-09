async function autoJoin(client) {
  const guild = await client.guilds.fetch(client.config.guildId).catch(() => null);
  if (!guild) return;

  const channel = await guild.channels.fetch(client.config.autoJoinVoiceChannelId).catch(() => null);
  if (!channel || !channel.isVoiceBased()) return;

  const player = client.manager.create({
    guild: guild.id,
    voiceChannel: channel.id,
    textChannel: client.config.voiceTextChannelId,
    selfDeafen: true,
    volume: client.config.defaultVolume
  });

  if (player.state !== "CONNECTED") player.connect();

  const state = require("./playerStore").ensureGuildState(guild.id);
  state.boundTextChannelId = client.config.voiceTextChannelId;
  state.boundVoiceChannelId = channel.id;
  player.set("repeatMode", "off");
}

module.exports = { autoJoin };