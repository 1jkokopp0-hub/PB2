const { errorEmbed, okEmbed } = require("../utils/embeds");
module.exports = {
  name: "مسح",
  aliases: ["clear"],
  async run({ client, message }) {
    const player = client.manager.players.get(message.guild.id);
    if (!player || !player.queue.length) return message.channel.send({ embeds: [errorEmbed("القائمة فاضية أصلاً.")] });
    player.queue.clear();
    return message.channel.send({ embeds: [okEmbed("تم", "تم مسح القائمة.")] });
  }
};