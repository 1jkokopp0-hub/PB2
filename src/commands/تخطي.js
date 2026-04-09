const { error, ok } = require("../utils/embeds");

module.exports = {
  name: "تخطي",
  aliases: ["سكيب", "skip"],
  async run({ client, message }) {
    const player = client.lavalink.getPlayer(message.guild.id);
    if (!player || !player.queue.current) return message.channel.send({ embeds: [error("ماكو شي شغال حالياً.")] });
    await player.skip();
    return message.channel.send({ embeds: [ok("تم تخطي الاغنية.")] });
  }
};