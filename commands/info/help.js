const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");
const { prefix } = require('../../config.json');
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "help",
    description: 'Feeling lost?',
    cooldown: 5000,
    async execute(client, message, args) {
        try {
            const globPromise = promisify(glob);
            const commandFiles = await globPromise(`${process.cwd()}/commands/music/**/*.js`);
          if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return;
          if (!message.member.voice.channel)
            return;
            let embed = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

            commandFiles.map((value) => {
                const file = require(value);
                const splitted = value.split("/");
                const directory = splitted[splitted.length - 2];

                if (file.name) {
                    const properties = { directory, ...file };
                    embed.addFields({ name: `${prefix}${properties.name}`, value: `${properties.description}`, inline: false })
                }
            });


            message.reply({ embeds: [embed] })
        } catch (err) {
            console.log(err)
        }
    },
};