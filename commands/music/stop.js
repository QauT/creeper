const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "stop",
    description: "Stop the current song and clears the entire music queue.",
    cooldown: 5000,
    aliases: ['st', 'ايقاف', 'وقف'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return
            if (!message.member.voice.channel)
                return
            const queue = distube.getQueue(message)
            if (!queue) return message.reply({ content: `:no_entry_sign: There must be music playing to use that!` })
            message.reply({ content: `:notes: The player has stopped and the queue has been cleared.` })
            return distube.stop(message);
        } catch (err) {
            console.log(err)
        }
    },
};