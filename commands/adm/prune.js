const { Command } = require('discord.js-commando');

module.exports = class PruneCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'prune',
            group: 'adm',
            memberName: 'prune',
            description: 'Cleans an amount of messages in the current channel',
            guildOnly: true,
            args: [
                {
                    key: "number",
                    prompt: "How many messages would you like to prune in this channel?",
                    type: "integer",
                    validate: m => {
                        if(m < 100 || m > 1) return true;
                        return 'Please specify a number between 2 and 100. Beep Boop :robot:'
                    }
                }
            ]
        });
    }
    
    hasPermission(msg) {
        return msg.member.hasPermission('MANAGE_MESSAGES') || this.client.isOwner(msg.author);
    }
    
    run(message, args) {
        const { number } = args;

        message.channel.fetchMessages({limit: number}).then(messages => {

            message.channel.bulkDelete(messages).then(message.say(`:white_check_mark: Removed ${messages.size} messages. Beep Boop :robot:`)).catch(error => console.log(error.stack));
        });
    }
}
