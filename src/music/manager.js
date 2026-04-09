const { Manager } = require("erela.js");
const { musicEmbed, errorEmbed } = require("../utils/embeds");
const { ensureGuildState } = require("./playerStore");

function createManager(client) {
  const manager = new Manager({
    nodes: [
      {
        host: client.config.lavalink.host,
        port: client.config.lavalink.port,
        password: client.config.lavalink.password,
        secure: client.config.lavalink.secure,
        retryAmount: 50,
        retryDelay: 5000
      }
    ],
    send(id, payload) {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    }
  });

  manager
    .on("nodeConnect", (node) => console.log(`[LAVALINK] Connected: ${node.options.identifier}`))
    .on("nodeError", (node, error) => console.error(`[LAVALINK] ${node.options.identifier}`, error))
    .on("trackStart", async (player, track) => {
      const channel = client.channels.cache.get(player.textChannel);
      if (!channel) return;
      await channel.send({
        embeds: [musicEmbed("بدأ التشغيل", `[${track.title}](${track.uri})`)]
      }).catch(() => null);
    })
    .on("queueEnd", async (player) => {
      const channel = client.channels.cache.get(player.textChannel);
      if (channel) {
        await channel.send({ embeds: [musicEmbed("انتهت القائمة", "خلصت كل الاغاني الموجودة بالقائمة.")] }).catch(() => null);
      }
      player.destroy();
    })
    .on("trackError", async (player, track, payload) => {
      const channel = client.channels.cache.get(player.textChannel);
      if (channel) {
        await channel.send({
          embeds: [errorEmbed(`صار خطأ اثناء تشغيل **${track?.title || "المقطع"}**\n\`${payload?.exception?.message || "Unknown"}\``)]
        }).catch(() => null);
      }
      player.stop();
    });

  client.on("raw", (d) => manager.updateVoiceState(d));

  manager.searchTracks = async ({ query, requester, source = "youtube" }) => {
    const prefixed = /^(https?:\/\/)/i.test(query) ? query : `${source}search:${query}`;
    const res = await manager.search(prefixed, requester);
    return res;
  };

  manager.ensurePlayer = (message) => {
    const state = ensureGuildState(message.guild.id);
    const player = manager.create({
      guild: message.guild.id,
      voiceChannel: state.boundVoiceChannelId || message.member.voice.channelId,
      textChannel: state.boundTextChannelId || message.channel.id,
      selfDeafen: true,
      volume: client.config.defaultVolume
    });

    player.set("repeatMode", player.get("repeatMode") || "off");
    state.boundTextChannelId = message.channel.id;
    state.boundVoiceChannelId = message.member.voice.channelId || state.boundVoiceChannelId;
    return player;
  };

  return manager;
}

module.exports = { createManager };