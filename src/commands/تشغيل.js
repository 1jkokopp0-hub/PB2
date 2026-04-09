const { errorEmbed, musicEmbed } = require("../utils/embeds");

module.exports = {
  name: "تشغيل",
  aliases: ["شغل", "play", "p"],
  async run({ client, message, args }) {
    const query = args.join(" ").trim();
    if (!query) {
      return message.channel.send({ embeds: [errorEmbed("اكتب اسم اغنية او رابط.")] });
    }

    if (!message.member.voice.channelId) {
      return message.channel.send({ embeds: [errorEmbed("لازم تدخل روم صوتي اول.")] });
    }

    const player = client.manager.ensurePlayer(message);
    if (player.state !== "CONNECTED") player.connect();

    const res = await client.manager.searchTracks({
      query,
      requester: {
        id: message.author.id,
        username: message.author.username,
        displayAvatarURL: message.author.displayAvatarURL()
      }
    });

    if (!res || !res.tracks?.length) {
      return message.channel.send({ embeds: [errorEmbed("ما حصلت نتيجة مناسبة.")] });
    }

    if (res.loadType === "PLAYLIST_LOADED") {
      const tracks = res.tracks.slice(0, 50);
      for (const track of tracks) player.queue.add(track);
      if (!player.playing && !player.paused && !player.queue.current) player.play();
      return message.channel.send({
        embeds: [musicEmbed("تمت اضافة قائمة", `تمت اضافة **${tracks.length}** اغنية للقائمة.`)]
      });
    }

    const track = res.tracks[0];
    player.queue.add(track);

    if (!player.playing && !player.paused && !player.queue.current) {
      player.play();
      return message.channel.send({ embeds: [musicEmbed("جاري التشغيل", `[${track.title}](${track.uri})`)] });
    }

    return message.channel.send({ embeds: [musicEmbed("تمت الاضافة", `[${track.title}](${track.uri})`)] });
  }
};