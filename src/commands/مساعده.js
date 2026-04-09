const { info } = require("../utils/embeds");

module.exports = {
  name: "مساعده",
  aliases: ["اوامر", "help"],
  async run({ message, prefix }) {
    await message.channel.send({
      embeds: [info("اوامر الموسيقى", [
        `\`${prefix}مساعده\``,
        `\`${prefix}تشغيل اسم او رابط\``,
        `\`${prefix}play اسم او رابط\``,
        `\`${prefix}تخطي\``,
        `\`${prefix}ايقاف\``,
        `\`${prefix}قائمة\``,
        `\`${prefix}الان\``,
        `\`${prefix}باوز\``,
        `\`${prefix}كمل\``,
        `\`${prefix}صوت 80\``
      ].join("\n"))]
    });
  }
};