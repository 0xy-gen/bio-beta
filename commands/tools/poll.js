const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

class PollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'poll',
            group: 'tools',
            memberName: 'poll',
            description: 'Starts a yes/no poll',
            examples: ['poll Is 0xygen the best?'],
            args: [
                {
                    key: 'topic',
                    prompt: 'What topic do you want to start a poll about?',
                    type: 'string'
                }
            ],
            guildOnly: true
        });
    }
    
    async run(msg, args) {
        //check if poll contains question mark at the end
        if(msg.content.endsWith('?') === false) {
            //add question mark to end
            const { topic } = args;
            global.questionMark = '?';
            global.messageWithQuestionMark = topic + global.questionMark;
        }
        else if(msg.content.endsWith('?') === true) {
            //It already has a question mark
            const { topic } = args;
            global.messageWithQuestionMark = topic;
        }
        
        const embed = new RichEmbed()
            //.setAuthor(msg.member.displayName + ' made a poll. React to this message to vote on it.')
	    .setAuthor('Poll: ' + global.messageWithQuestionMark)
            .setColor(msg.member.colorRole.color)
            //.setDescription('\n'+global.messageWithQuestionMark);
	    .setFooter(msg.member.displayName + ' made a poll. React to this message to vote on it.');
        
        const pollTopic = await msg.embed(embed);
        await pollTopic.react('✅');
        await pollTopic.react('⛔')
	await msg.delete();
    }
}

module.exports = PollCommand;
