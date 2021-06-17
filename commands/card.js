/* eslint-disable no-unused-vars */
const Card = require('../database/models/cards');
const modesList = require('../modesList');

async function addCard(message, args) {
    const modeNumber = args.shift() - 1;
    const userMode = modesList[modeNumber];
    const userPrompt = args.join(' ');
    const card = new Card({
        mode: userMode,
        prompt: userPrompt,
    });

    (async () => {
        try {
            await card.save();
            return message.channel.send('Card Added Successfully');
        }
        catch (err) {
            return message.channel.send('Error saving card.');
        }
    })();


}

async function removeCard(message, args) {
    const modeNumber = args.shift() - 1;
    const userMode = modesList[modeNumber];
    const userPrompt = args.join(' ');

    const query = Card.findOneAndDelete({ mode: userMode, prompt: userPrompt });
    const result = await query;

    if(!result) {
        return message.channel.send('Card could not be found. Please make sure the card actually exists');
    }

    const { mode, prompt } = result;
    return message.channel.send(`Card with mode: ${mode} and prompt: ${prompt} has been removed from the database`);


}

async function randomCard(message, args, Discord) {
    // Get the count of all cards
    Card.countDocuments().exec(function(err, count) {

        // Get a random entry
        const random = Math.floor(Math.random() * count);

        // Again query all users but only fetch one offset by our random #
        Card.findOne().skip(random).exec(
            function(err, result) {
                // Tada! random card
                const newEmbed = new Discord.MessageEmbed()
                    .setTitle('CARD')
                    .setColor('#dc143c')
                    .setThumbnail('https://i.imgur.com/3Kf6oXH.png')
                    .addField(result.mode, result.prompt, true);
                switch(result.mode) {
                case modesList[0]:
                    newEmbed.setFooter('Whoever picks this card up reads it out loud to the group. They apply to EVERYONE playing. If the statement is true for you, drink up!');
                    break;
                case modesList[1]:
                    newEmbed.setFooter('The card tells you what the category is. Whoever drew the card starts by saying something that falls under that category. Go in turns around the group. No repeats, no hesitations... or else.');
                    break;
                case modesList[2]:
                    newEmbed.setFooter('Everyone tell whatever story the card tells you to. If you refuse, you have to drink. Whoever tells the BEST story gets to make other players drink.');
                    break;
                case modesList[3]:
                    newEmbed.setFooter('Read the card out loud. On the count of three (no cheating!) point to whoever you think fits the prompt best. Most voted has to drink.');
                    break;
                case modesList[4]:
                    newEmbed.setFooter('Some people ask... how do you get an AZN FLUSH? Well, by AZN FLUSH we mean asian flush or asian glow. It\'s when you get red from drinking too much.');
                    break;
                case modesList[6]:
                    newEmbed.setFooter('Read the card out loud to the group. Call one option #1, the other option #2. On the count of 3 (no cheating!) everyone raises 1 or 2 fingers to show their vote. The "losers" have to drink.');
                    break;
                case modesList[7]:
                    newEmbed.setFooter('Try to answer the question on the card correctly. Get it right and you could make others drink. Get it wrong and you might have to drink.');
                    break;
                case modesList[8]:
                    newEmbed.setFooter('Whoever reads this card has to complete the dare on the card. If you refuse? Surprise! You have to drink.');
                    break;
                case modesList[9]:
                    newEmbed.setFooter('Unlike story time, this card only applies to the reader. You have to answer the question truthfully, or else you have drink.');
                }
                return message.channel.send(newEmbed);
            });
    });
}

module.exports = {
    name: 'card',
    aliases: [],
    description: 'Adds a card, removes a card, or spits out a random card',
    args: true,
    usage: '\n[add] [mode#] [prompt] **OR** \n[remove] [mode#] [prompt] **OR** [random]',
    execute(message, args, Discord) {

        // Get the first argument and remove it from array
        const firstArg = args.shift().toLowerCase();

        if(firstArg === 'add') {
            if(args.length <= 2) {
                return message.channel.send('Command needs three (3) arguments, run help command for more info');
            }
            // Call addCard function to add to database
            addCard(message, args);
        }
        else if(firstArg === 'remove') {
            if(args.length <= 2) {
                return message.channel.send('Command needs three (3) arguments, run help command for more info');
            }
            // Call to removeCard to remove from database
            removeCard(message, args);
        }
        else if(firstArg === 'random') {
            randomCard(message, args, Discord);
        }
        else {
            return message.channel.send('Add or Remove not found. Use !help [command] for proper usage');
        }
    },
};