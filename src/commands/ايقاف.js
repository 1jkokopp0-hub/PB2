const { errorEmbed, okEmbed } = require("../utils/embeds");

module.exports = {
  name: "ايقاف",
  aliases: ["وقف", "stop", "disconnect"],
  async run({ client, message }) {
    const player = client.manager.players.get(message.guild.id);
    if (!player) return message.channel.send({ embeds: [errorEmbed("البوت مو شابك حالياً.")] });
    player.destroy();
    return message.channel.send({ embeds: [okEmbed("تم", "تم ايقاف التشغيل وخروج البوت من الروم.")] });
  }
};