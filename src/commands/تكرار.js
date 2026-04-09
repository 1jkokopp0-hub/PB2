const { errorEmbed, okEmbed } = require("../utils/embeds");

module.exports = {
  name: "تكرار",
  aliases: ["repeat", "loop"],
  async run({ client, message, args }) {
    const player = client.manager.players.get(message.guild.id);
    if (!player) return message.channel.send({ embeds: [errorEmbed("ماكو تشغيل حالياً.")] });

    const mode = (args[0] || "").toLowerCase();
    if (["اغنيه", "song", "track"].includes(mode)) {
      player.setTrackRepeat(true);
      player.setQueueRepeat(false);
      player.set("repeatMode", "اغنية");
      return message.channel.send({ embeds: [okEmbed("تم", "تم تفعيل تكرار الاغنية.")] });
    }
    if (["قائمه", "قائمة", "queue"].includes(mode)) {
      player.setQueueRepeat(true);
      player.setTrackRepeat(false);
      player.set("repeatMode", "قائمة");
      return message.channel.send({ embeds: [okEmbed("تم", "تم تفعيل تكرار القائمة.")] });
    }
    if (["ايقاف", "off", "stop"].includes(mode)) {
      player.setQueueRepeat(false);
      player.setTrackRepeat(false);
      player.set("repeatMode", "off");
      return message.channel.send({ embeds: [okEmbed("تم", "تم ايقاف التكرار.")] });
    }

    return message.channel.send({ embeds: [errorEmbed("استخدم: تكرار اغنية / تكرار قائمة / تكرار ايقاف")] });
  }
};