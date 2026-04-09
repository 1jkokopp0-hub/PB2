const { errorEmbed, okEmbed } = require("../utils/embeds");
const { presets, applyFilter } = require("../music/filters");

module.exports = {
  name: "فلتر",
  aliases: ["filter"],
  async run({ client, message, args }) {
    const player = client.manager.players.get(message.guild.id);
    if (!player || !player.queue.current) return message.channel.send({ embeds: [errorEmbed("ماكو شيء شغال.")] });
    const name = args[0];
    if (!name || !presets[name]) {
      return message.channel.send({ embeds: [errorEmbed(`الفلاتر المتاحة: ${Object.keys(presets).join("، ")}`)] });
    }
    await applyFilter(player, name);
    return message.channel.send({ embeds: [okEmbed("تم", `تم تطبيق فلتر **${name}**.`)] });
  }
};