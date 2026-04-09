const { baseEmbed } = require("../utils/embeds");

module.exports = {
  name: "مساعده",
  aliases: ["اوامر", "help"],
  async run({ message, prefix }) {
    const lines = [
      `\`${prefix}تشغيل اسم الاغنية او الرابط\``,
      `\`${prefix}ابحث اسم\``,
      `\`${prefix}تخطي\``,
      `\`${prefix}رجوع\``,
      `\`${prefix}تقديم 60\``,
      `\`${prefix}قائمة\``,
      `\`${prefix}الان\``,
      `\`${prefix}صوت 80\``,
      `\`${prefix}باوز\``,
      `\`${prefix}كمل\``,
      `\`${prefix}تكرار اغنية\` أو ` + `\`${prefix}تكرار قائمة\` أو ` + `\`${prefix}تكرار ايقاف\``,
      `\`${prefix}فلتر باس\``,
      `\`${prefix}خلط\``,
      `\`${prefix}ازالة 3\``,
      `\`${prefix}مسح\``,
      `\`${prefix}ايقاف\``
    ];

    await message.channel.send({ embeds: [baseEmbed("اوامر الموسيقى", lines.join("\n"))] });
  }
};