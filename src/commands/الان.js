const { error, info } = require("../utils/embeds");
const { msToTime } = require("../utils/time");

module.exports = {
  name: "الان",
  aliases: ["now", "np"],
  async run({ client, message }) {
    const player = client.lavalink.getPlayer(message.guild.id);
    if (!player || !player.queue.current) return message.channel.send({ embeds: [error("ماكو شي شغال.")] });
    const track = player.queue.current;
    return message.channel.send({
      embeds: [info("يعمل الآن", `**${track.info.title}**\nالمدة: \`${msToTime(track.info.duration)}\`\nالصوت: **${player.volume}%**`)]
    });
  }
};