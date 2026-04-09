const presets = {
  عادي: {},
  ناعم: { timescale: { speed: 1.02, pitch: 1.0, rate: 1.0 }, equalizer: [{ band: 0, gain: 0.1 }, { band: 1, gain: 0.08 }, { band: 2, gain: 0.05 }] },
  قوي: { equalizer: [{ band: 0, gain: 0.15 }, { band: 1, gain: 0.12 }, { band: 2, gain: 0.1 }, { band: 3, gain: 0.08 }] },
  باس: { equalizer: [{ band: 0, gain: 0.25 }, { band: 1, gain: 0.2 }, { band: 2, gain: 0.12 }] },
  مسرع: { timescale: { speed: 1.12, pitch: 1.0, rate: 1.0 } },
  تبطيء: { timescale: { speed: 0.92, pitch: 1.0, rate: 1.0 } },
  ليلي: { lowPass: { smoothing: 20.0 } },
  "8d": { rotation: { rotationHz: 0.2 } },
  "كاريوكي": { karaoke: { level: 1.0, monoLevel: 1.0, filterBand: 220.0, filterWidth: 100.0 } }
};

async function applyFilter(player, name) {
  const preset = presets[name] || presets["عادي"];
  await player.node.updatePlayer({
    guildId: player.guild,
    playerOptions: {
      filters: preset
    }
  });
  return preset;
}

module.exports = { presets, applyFilter };