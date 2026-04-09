const { errorEmbed, okEmbed } = require("../utils/embeds");

module.exports = {
  name: "تخطي",
  aliases: ["سكيب", "skip"],
  async run({ client, message }) {
    const player = client.manager.players.get(message.guild.id);
    if (!player || !player.queue.current) return message.channel.send({ embeds: [errorEmbed("ماكو شي شغال حالياً.")] });
    player.stop();
    return message.channel.send({ embeds: [okEmbed("تم", "تم تخطي الاغنية.")] });
  }
};