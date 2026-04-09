const { msToTime } = require("../utils/time");
const { info } = require("../utils/embeds");

function queueEmbed(player) {
  const current = player.queue.current;
  const upcoming = player.queue.tracks.slice(0, 10);
  const lines = [];

  if (current) lines.push(`**الان:** **${current.info.title}** — \`${msToTime(current.info.duration)}\``);
  if (!upcoming.length) lines.push("\nلا توجد اغاني قادمة.");
  else {
    lines.push("\n**القائمة القادمة:**");
    upcoming.forEach((track, index) => lines.push(`${index + 1}. ${track.info.title} — \`${msToTime(track.info.duration)}\``));
  }

  lines.push(`\n**الصوت:** ${player.volume}%`);
  return info("قائمة التشغيل", lines.join("\n"));
}

module.exports = { queueEmbed };