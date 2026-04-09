const { error, ok } = require("../utils/embeds");

module.exports = {
  name: "صوت",
  aliases: ["volume", "vol"],
  async run({ client, message, args }) {
    const player = client.lavalink.getPlayer(message.guild.id);
    if (!player) return message.channel.send({ embeds: [error("ماكو تشغيل حالياً.")] });
    const volume = Number(args[0]);
    if (!Number.isFinite(volume) || volume < 1 || volume > 200) {
      return message.channel.send({ embeds: [error("اكتب رقم من 1 الى 200.")] });
    }
    await player.setVolume(volume);
    return message.channel.send({ embeds: [ok(`تم تغيير الصوت الى **${volume}%**.`)] });
  }
};