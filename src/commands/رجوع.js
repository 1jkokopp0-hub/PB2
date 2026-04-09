const { errorEmbed, okEmbed } = require("../utils/embeds");
module.exports = {
  name: "رجوع",
  aliases: ["back"],
  async run({ client, message, args }) {
    const player = client.manager.players.get(message.guild.id);
    if (!player || !player.queue.current) return message.channel.send({ embeds: [errorEmbed("ماكو شيء شغال.")] });
    const seconds = Number(args[0] || 10);
    if (!Number.isFinite(seconds) || seconds < 1) return message.channel.send({ embeds: [errorEmbed("اكتب عدد ثواني صحيح.")] });
    const target = Math.max(player.position - seconds * 1000, 0);
    player.seek(target);
    return message.channel.send({ embeds: [okEmbed("تم", `تم الرجوع ${seconds} ثانية.`)] });
  }
};