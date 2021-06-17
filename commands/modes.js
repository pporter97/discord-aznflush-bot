const modesList = require('../modesList');

module.exports = {
    name: 'modes',
    args: false,
    aliases: [],
    description: 'List all categories for Azn Flush',
    usage: '\n[categories]',
    execute(message, args, Discord) {
        let i = 0;
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#dc143c')
            .setTitle('Modes')
            .setDescription('The list of modes are: ')
            .setThumbnail('https://i.imgur.com/3Kf6oXH.png');
        for(i = 0; i < modesList.length; ++i) {
            newEmbed.addField(`Mode #${i + 1}`, modesList[i], true);
        }
        message.channel.send(newEmbed);
    },
};