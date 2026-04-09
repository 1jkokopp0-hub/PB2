const { errorEmbed, baseEmbed } = require("../utils/embeds");
const { msToTime } = require("../utils/time");

module.exports = {
  name: "الان",
  aliases: ["now", "np"],
  async run({ client, message }) {
    const player = client.manager.players.get(message.guild.id);
    if (!player || !player.queue.current) return message.channel.send({ embeds: [errorEmbed("ماكو شي شغال.")] });

    const track = player.queue.current;
    return message.channel.send({
      embeds: [baseEmbed("يعمل الآن", `**${track.title}**\nالمدة: \`${msToTime(track.duration)}\`\nالصوت: **${player.volume}%**`)]
    });
  }
};