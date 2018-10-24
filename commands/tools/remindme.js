const { Command } = require('discord.js-commando');
var remind = require('../../util/remind.js');
const cfg = require('../../cfg.json');

function timeParser(ammount, mod) {
	switch (ammount) {
		case "a": case "an": case "one": case "1": //js pls
			return 1 * mod;
		case "two": case "2":
			return 2 * mod;
		case "three": case "3":
			return 3 * mod;
		default:
			return parseInt(ammount) * mod;
	}
}

class RemindCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'remindme',
            group: 'tools',
            memberName: 'remindme',
            aliases: ['remind'],
            description: 'Set a reminder.',
            details: '\n__remove:__ Will remove a reminder containing the text input.\n__list:__ List your reminders.\n__add:__ Use the *<text> in <[0 days] [00 hours] [00 minutes] [000 seconds]>*  format.',
            format: "remove <text in reminder> | list | <reminder> in <[0 days] [00 hours] [00 minutes] [000 seconds]>",
            examples: ['remindme to dab in 1d 3h 3m 7s', 'remind dab in 1hour'],
            args: [
                {
                    key: 'option',
                    type: 'string',
                    prompt: 'Missing Arguments!',
                    wait: 2

                }
            ],
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    run(msg, args) {
        let { option } = args;
        
        if(/^remove/i.test(option)) {
            if(option.length > 7) {
                remind.removeReminder(option.replace(/^remove /i, ''), msg.author.id, () => { //It was a success
                    msg.reply('👍 Successfully removed reminder. Beep Boop 🤖');
                }, ()=> { //It was a fail
                    msg.reply('👎 No matching reminder found! Beep Boop 🤖');
                });
            } else {
                var list = remind.listForUser(msg.author.id);
                if(list && list.length > 0) return msg.say("__Use `" + cfg.prefix + "remindme remove ` + the text from the reminder you wish to remove:__\n"+list.join('\n'));
                else return msg.say('Looks like you don\'t have any reminders! Beep Boop 🤖');
            }
        } else if(option.toLowerCase() === 'list') {
            var list = remind.listForUser(msg.author.id);
            if(list && list.length > 0) return msg.say("__Here are your reminders:__\n"+list.join('\n'));
            else return msg.say('Looks like you don\'t have any reminders! Beep Boop 🤖');
        } else if(/^.* in( ((\d|a|one|two|three) ?d[ays]*)( and| &)?)?( ((\d\d?\d?|a|an|one|two|three) ?h[ours]*)( and| &)?)?( ((\d\d?\d?|a|one|two|three) ?m[inutes]*)( and| &)?)?( (\d\d?\d?|a|one|two|three) ?s[econds]*)?$/i.test(option)) {
            if(remind.countForUser(msg.author.id) >= 5) {
                bot.reply("You can't add any more reminders because you already have 5. You can remove a reminder to make space with `" + cfg.prefix + "remindme remove <text>`");
                return;
            }

            var millisecs = 0, timeString = option.replace(/.* in /i, '');
            if (/ ((\d\d?\d?\d?\d?|a|one|two|three) ?s[econds]*)$/i.test(option)) {
                millisecs += timeParser(/((\d\d?\d?\d?\d?|a|one|two|three) ?s[econds]*)$/i.exec(option)[2] + "", 1000);
                option = option.replace(/( and| &)? ((\d\d?\d?\d?\d?|a|one|two|three) ?s[econds]*)$/i, '');
            }
            if (/ ((\d\d?\d?|a|one|two|three) ?m[inutes]*)$/i.test(option)) {
                millisecs += timeParser(/((\d\d?\d?|a|one|two|three) ?m[inutes]*)$/i.exec(option)[2] + "", 60000);
                option = option.replace(/( and| &)? ((\d\d?\d?|a|one|two|three) ?m[inutes]*)$/i, '');
            }
            if (/ ((\d\d?\d?|a|an|one|two|three) ?h[ours]*)$/i.test(option)) {
                millisecs += timeParser(/((\d\d?\d?|a|an|one|two|three) ?h[ours]*)$/i.exec(option)[2] + "", 3600000);
                option = option.replace(/( and| &)? ((\d\d?\d?|a|an|one|two|three) ?h[ours]*)$/i, '');
            }
            if (/ ((\d|a|one|two|three) ?d[ays]*)$/i.test(option)) {
                var hours = /((\d|a|one|two|three) ?d[ays]*)$/i.exec(option)[2];
                if (/\d/.test(hours)) {
                    if (hours > 7) { msg.say("There is a 7 day limit on reminders! Beep Boop 🤖").then(msg.delete(10000)); return; }
                }
                millisecs += timeParser(hours + "", 86400000);
                option = option.replace(/( and| &)? ((\d|a|one|two|three) ?d[ays]*)$/i, '');
            }
            if (millisecs > 604800000) { msg.say("There is a 7 day limit on reminders! Beep Boop 🤖").then(msg.delete(10000)); return; }
            else if (millisecs <= 0) { msg.say("You must specify a time in the future! Beep Boop 🤖").then(msg.delete(10000)); return; }

            var reminder = option.replace(/^(me )?(to )?/i, '').replace(/in ?$/i, '').trim();
            remind.addReminder(msg.author.id, Date.now() + millisecs, reminder);
            msg.say("⏰ Got it! I'll remind you in " + timeString + "! Beep Boop 🤖");
        } else msg.reply("the correct usage is *`" + cfg.prefix + this.name + ' ' + this.format + '`*');
    }
}

module.exports = RemindCommand;