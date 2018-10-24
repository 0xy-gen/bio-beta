const { Command } = require('discord.js-commando');

class UserIdCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'userid',
            group: 'general',
            memberName: 'userid',
            description: 'Returns the User ID of the provided user.',
            aliases: ['uid', 'id'],
            examples: ['userid @ExampleDude', 'uid @ExampleDude', 'id @ExampleDude'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want the id of?',
                    type: 'member'
                }
            ]
        });
    }

    async run(msg, args) {
        const { user } = args;
        const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';
        await console.log(`${channelTag} »» ${msg.author.username}#${msg.author.discriminator} issued command »» ${msg.content}`);
        await msg.reply('```javascript\n'+user.id+'```');
        return;
    }
}

module.exports = UserIdCommand;