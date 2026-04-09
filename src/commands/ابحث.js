const { ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const { errorEmbed, baseEmbed } = require("../utils/embeds");

module.exports = {
  name: "ابحث",
  aliases: ["search"],
  async run({ client, message, args }) {
    const query = args.join(" ").trim();
    if (!query) return message.channel.send({ embeds: [errorEmbed("اكتب الشيء اللي تبي تبحث عنه.")] });
    if (!message.member.voice.channelId) return message.channel.send({ embeds: [errorEmbed("لازم تدخل روم صوتي اول.")] });

    const player = client.manager.ensurePlayer(message);
    if (player.state !== "CONNECTED") player.connect();

    const res = await client.manager.searchTracks({ query, requester: message.author, source: "youtube" });
    if (!res?.tracks?.length) return message.channel.send({ embeds: [errorEmbed("ما لقيت نتائج.")] });

    const tracks = res.tracks.slice(0, client.config.searchLimit);
    const menu = new StringSelectMenuBuilder()
      .setCustomId(`music_search:${message.author.id}`)
      .setPlaceholder("اختر نتيجة للتشغيل")
      .addOptions(tracks.map((t, i) => ({
        label: t.title.slice(0, 100),
        description: (t.author || "Unknown").slice(0, 100),
        value: String(i)
      })));

    const sent = await message.channel.send({
      embeds: [baseEmbed("نتائج البحث", tracks.map((t, i) => `${i + 1}. **${t.title}**`).join("\n"))],
      components: [new ActionRowBuilder().addComponents(menu)]
    });

    const collector = sent.createMessageComponentCollector({ time: 30000 });
    collector.on("collect", async (interaction) => {
      if (interaction.user.id !== message.author.id) {
        return interaction.reply({ content: "هذا الاختيار مو لك.", ephemeral: true });
      }
      const picked = tracks[Number(interaction.values[0])];
      player.queue.add(picked);
      if (!player.playing && !player.paused && !player.queue.current) player.play();
      await interaction.update({
        embeds: [baseEmbed("تمت الاضافة", `تم اختيار **${picked.title}**`)],
        components: []
      });
      collector.stop("picked");
    });

    collector.on("end", async (_, reason) => {
      if (reason === "picked") return;
      await sent.edit({ components: [] }).catch(() => null);
    });
  }
};