const { errorEmbed, okEmbed } = require("../utils/embeds");
module.exports = {
  name: "خلط",
  aliases: ["shuffle"],
  async run({ client, message }) {
    const player = client.manager.players.get(message.guild.id);
    if (!player || player.queue.length < 2) return message.channel.send({ embeds: [errorEmbed("تحتاج اغنيتين او اكثر بالقائمة.")] });
    player.queue.shuffle();
    return message.channel.send({ embeds: [okEmbed("تم", "تم خلط القائمة.")] });
  }
};