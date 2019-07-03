 module.exports = {
	name: 'hug',
	description: 'Get hugs!',
	execute(message, args) {
		var mention = message.mentions.members.first();
        	if (!message.isMentioned(mention)) {msg.send(`(>^_^)> ${message.author} <(^.^<)`);return}
        	msg.send(`(>^_^)> ${mention} <(^.^<)`);
	},
};
