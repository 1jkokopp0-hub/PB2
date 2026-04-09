function msToTime(ms = 0) {
  if (!ms || ms <= 0) return "LIVE";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return [hours, minutes, seconds].map((v, i) => i === 0 ? String(v) : String(v).padStart(2, "0")).join(":");
  return [minutes, seconds].map(v => String(v).padStart(2, "0")).join(":");
}

module.exports = { msToTime };