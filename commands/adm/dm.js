const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dm',
            group: 'adm',
            memberName: 'dm',
            description: 'Sends a message to the user you mention',
            examples: ['dm @user Hi there! lol'],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to send the DM to?',
                    type: 'user'
                },
                {
                    key: 'content',
                    prompt: 'What would you like the content of the message to be?',
                    type: 'string'
                }
            ]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }
    
    run(msg, args) {
        const { user, content } = args;
        const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';
        console.log(`${channelTag} »» ${msg.author.username}#${msg.author.discriminator} issued command »» ${msg.content}`);
        return user.send(content);
    }
}