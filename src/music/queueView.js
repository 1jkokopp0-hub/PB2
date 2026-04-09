const { baseEmbed } = require("../utils/embeds");
const { msToTime } = require("../utils/time");

function queueEmbed(player) {
  const current = player.queue.current;
  const upcoming = player.queue.slice(0, 10);
  const lines = [];

  if (current) {
    lines.push(`**الان:** [${current.title}](${current.uri}) — \`${msToTime(current.duration)}\``);
  }

  if (!upcoming.length) {
    lines.push("\nلا توجد اغاني قادمة.");
  } else {
    lines.push("\n**القائمة القادمة:**");
    upcoming.forEach((track, index) => {
      lines.push(`${index + 1}. [${track.title}](${track.uri}) — \`${msToTime(track.duration)}\``);
    });
  }

  lines.push(`\n**الحجم:** ${player.volume}%`);
  lines.push(`**التكرار:** ${player.get("repeatMode") || "off"}`);
  return baseEmbed("قائمة التشغيل", lines.join("\n"));
}

module.exports = { queueEmbed };