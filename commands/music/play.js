const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const wait = require('node:timers/promises').setTimeout;
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "play",
    description: "Add a song to queue and plays it.",
    cooldown: 5000,
    aliases: ['p', 'ش', 'شغل'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return 
            if (!message.member.voice.channel)
                return 
            let player = args.slice(0).join(' ')
            if (!player) return message.reply({ content: `:no_entry_sign: يجب عليك كتابة اسم الأغنية أو رابط الأغنية .` })

            const queue = distube.getQueue(message)
            message.reply({ content: `:watch: Searching ... (\`${player}\`)` }).then(msg => {
                setTimeout(() => {
                    msg.delete()
                }, 3000);
            }).catch(() => { });

            const voiceChannel = message.member?.voice?.channel;
            if (voiceChannel) {
                await distube.play(voiceChannel, player, {
                    message,
                    textChannel: message.channel,
                    member: message.member,
                });

                // إذا تم تشغيل الأغنية بنجاح، أرسل الرسالة إمبد
                const song = distube.getQueue(message).songs[0];
              // تحديد قناة كتابية log عبر channelid
              const logChannel = client.channels.cache.get('1169346946645889156');
                const embed = new EmbedBuilder()
                    .setTitle("تم تشغيل الأغنية")
                    .setDescription(`تم تشغيل الأغنية [${song.name}](${song.url}) من قبل ${message.author}`)
                    .setColor("#00FF00");
                  logChannel.send({ embeds: [embed] });
            }
        } catch (err) {
            console.log(err)
        }
    },
};
