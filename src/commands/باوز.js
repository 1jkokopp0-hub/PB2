const { errorEmbed, okEmbed } = require("../utils/embeds");
module.exports = {
  name: "باوز",
  aliases: ["pause"],
  async run({ client, message }) {
    const player = client.manager.players.get(message.guild.id);
    if (!player || !player.queue.current) return message.channel.send({ embeds: [errorEmbed("ماكو شيء يتوقف.")] });
    player.pause(true);
    return message.channel.send({ embeds: [okEmbed("تم", "تم ايقاف الاغنية مؤقتاً.")] });
  }
};