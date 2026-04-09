const { errorEmbed } = require("../utils/embeds");
const { queueEmbed } = require("../music/queueView");

module.exports = {
  name: "قائمه",
  aliases: ["قائمة", "queue", "q"],
  async run({ client, message }) {
    const player = client.manager.players.get(message.guild.id);
    if (!player || (!player.queue.current && !player.queue.length)) {
      return message.channel.send({ embeds: [errorEmbed("القائمة فاضية.")] });
    }
    return message.channel.send({ embeds: [queueEmbed(player)] });
  }
};