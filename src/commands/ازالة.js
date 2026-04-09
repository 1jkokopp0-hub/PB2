const { errorEmbed, okEmbed } = require("../utils/embeds");
module.exports = {
  name: "ازاله",
  aliases: ["ازالة", "remove"],
  async run({ client, message, args }) {
    const player = client.manager.players.get(message.guild.id);
    if (!player || !player.queue.length) return message.channel.send({ embeds: [errorEmbed("القائمة فاضية.")] });
    const index = Number(args[0]);
    if (!Number.isFinite(index) || index < 1 || index > player.queue.length) {
      return message.channel.send({ embeds: [errorEmbed(`اختَر رقم من 1 الى ${player.queue.length}`)] });
    }
    const removed = player.queue[index - 1];
    player.queue.remove(index - 1);
    return message.channel.send({ embeds: [okEmbed("تم", `تمت ازالة **${removed.title}** من القائمة.`)] });
  }
};