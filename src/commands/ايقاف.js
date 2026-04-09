const { error, ok } = require("../utils/embeds");

module.exports = {
  name: "ايقاف",
  aliases: ["وقف", "stop", "disconnect"],
  async run({ client, message }) {
    const player = client.lavalink.getPlayer(message.guild.id);
    if (!player) return message.channel.send({ embeds: [error("البوت مو شابك حالياً.")] });
    await player.destroy();
    return message.channel.send({ embeds: [ok("تم ايقاف التشغيل وخروج البوت.")] });
  }
};