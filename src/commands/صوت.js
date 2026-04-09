const { errorEmbed, okEmbed } = require("../utils/embeds");

module.exports = {
  name: "صوت",
  aliases: ["volume", "vol"],
  async run({ client, message, args }) {
    const player = client.manager.players.get(message.guild.id);
    if (!player) return message.channel.send({ embeds: [errorEmbed("ماكو تشغيل حالياً.")] });
    const volume = Number(args[0]);
    if (!Number.isFinite(volume) || volume < 1 || volume > 200) {
      return message.channel.send({ embeds: [errorEmbed("اكتب رقم من 1 الى 200.")] });
    }
    player.setVolume(volume);
    return message.channel.send({ embeds: [okEmbed("تم", `تم تغيير الصوت الى **${volume}%**.`)] });
  }
};