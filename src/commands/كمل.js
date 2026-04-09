const { errorEmbed, okEmbed } = require("../utils/embeds");
module.exports = {
  name: "كمل",
  aliases: ["resume"],
  async run({ client, message }) {
    const player = client.manager.players.get(message.guild.id);
    if (!player || !player.queue.current) return message.channel.send({ embeds: [errorEmbed("ماكو شيء شغال.")] });
    player.pause(false);
    return message.channel.send({ embeds: [okEmbed("تم", "رجع التشغيل.")] });
  }
};