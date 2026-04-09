const { error, ok } = require("../utils/embeds");

module.exports = {
  name: "كمل",
  aliases: ["resume"],
  async run({ client, message }) {
    const player = client.lavalink.getPlayer(message.guild.id);
    if (!player || !player.queue.current) return message.channel.send({ embeds: [error("ماكو شي شغال.")] });
    await player.resume();
    return message.channel.send({ embeds: [ok("رجع التشغيل.")] });
  }
};