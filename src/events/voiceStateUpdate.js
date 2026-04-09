module.exports = async (client, oldState, newState) => {
  if (!oldState.guild) return;
  const player = client.manager.players.get(oldState.guild.id);
  if (!player) return;

  const voiceChannelId = player.voiceChannel;
  const channel = oldState.guild.channels.cache.get(voiceChannelId);
  if (!channel) return;

  const humans = channel.members.filter((m) => !m.user.bot);
  if (humans.size === 0) {
    setTimeout(() => {
      const fresh = channel.members.filter((m) => !m.user.bot);
      const currentPlayer = client.manager.players.get(oldState.guild.id);
      if (currentPlayer && fresh.size === 0) {
        currentPlayer.destroy();
      }
    }, 20000);
  }

  if (newState.id === client.user.id && newState.channelId !== voiceChannelId) {
    player.voiceChannel = newState.channelId;
  }
};