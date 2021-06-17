/* eslint-disable no-unused-vars */
const config = require('../config.json');

module.exports = {
    name: 'help',
    args: false,
    description: 'List all of my commands or info about a specific command.',
    aliases: ['commands'],
    usage: '\n[help] **OR** \n[help] [command name]',
    cooldown: 5,
    execute(message, args, Discord) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${config.prefix}help [command name]\` to get info on a specific command!`);

            return message.channel.send(data, { split: true });
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('That\'s not a valid command!');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${config.prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });
    },
};