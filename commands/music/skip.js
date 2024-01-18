const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "skip",
    description: "Skip the current song.",
    cooldown: 5000,
    aliases: ['s', 'التالي', 'تخطي'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return;
            if (!message.member.voice.channel)
                return;
            const queue = distube.getQueue(message)
            const song = queue.songs[0]
            let name = song.name
            if (!queue) return message.reply({ content: `:no_entry_sign: There must be music playing to use that!` })
            if (!queue.autoplay && queue.songs.length <= 1) return message.reply({ content: `:no_entry_sign:  this is last song in queue list` });
            message.reply({ content: `:notes: Skipped **${name}**` })
            return distube.skip(message);
        } catch (err) {
            console.log(err)
        }
    },
};