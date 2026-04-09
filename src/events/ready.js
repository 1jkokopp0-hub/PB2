module.exports = async (client) => {
  console.log(`[BOT] Logged in as ${client.user.tag}`);

  client.lavalink = require("../music/lavalink").createLavalink(client);
  await client.lavalink.init({
    id: client.user.id,
    username: client.user.username
  });

  const guild = await client.guilds.fetch(client.config.guildId).catch(() => null);
  const channel = guild ? await guild.channels.fetch(client.config.autoJoinVoiceChannelId).catch(() => null) : null;

  if (guild && channel && channel.isVoiceBased()) {
    const player = await client.lavalink.createPlayer({
      guildId: guild.id,
      voiceChannelId: channel.id,
      textChannelId: client.config.voiceTextChannelId,
      selfDeaf: true,
      volume: client.config.defaultVolume,
      instaUpdateFiltersFix: true,
      applyVolumeAsFilter: false
    });

    if (!player.connected) await player.connect();
    console.log("[BOT] Auto joined target voice channel.");
  }
};