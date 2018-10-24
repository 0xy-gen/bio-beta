const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            group: 'adm',
            memberName: 'say',
            description: 'Replies with the text you provide',
            examples: ['say Hi there!'],
            guildOnly: true,
            args: [
                {
                    key: 'text', //name of the argument
                    prompt: 'What text would you like the bot to say?', //output when no args were given e.g <prefix>say
                    type: 'string', //string,integer,user,member...
                    validate: text => {
                        if(text.length < 201) return true;
                        return 'Message content is above 200 characters';
                    }
                }
            ]
        });
    }
    
    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }
    
    run(msg, args) {
        if(msg.channel.type !== 'dm')
            if(!msg.channel.permissionsFor(this.client.user).has('MANAGE_MESSAGES'))
                return msg.say('Error! I don\'t have permissions to Manage Messages! Beep Boop :robot:');
        const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';
        console.log(`${channelTag} »» ${msg.author.username}#${msg.author.discriminator} issued command »» ${msg.content}`);
        
        const { text } = args;
        msg.delete();
        return msg.say(`\u180E${text}`);
    }
};