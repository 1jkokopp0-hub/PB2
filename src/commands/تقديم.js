const { errorEmbed, okEmbed } = require("../utils/embeds");
module.exports = {
  name: "تقديم",
  aliases: ["seek", "forward"],
  async run({ client, message, args }) {
    const player = client.manager.players.get(message.guild.id);
    if (!player || !player.queue.current) return message.channel.send({ embeds: [errorEmbed("ماكو شيء شغال.")] });
    const seconds = Number(args[0]);
    if (!Number.isFinite(seconds) || seconds < 1) return message.channel.send({ embeds: [errorEmbed("اكتب عدد ثواني صحيح.")] });
    const target = Math.min(player.position + seconds * 1000, player.queue.current.duration - 1000);
    player.seek(target);
    return message.channel.send({ embeds: [okEmbed("تم", `تم التقديم ${seconds} ثانية.`)] });
  }
};