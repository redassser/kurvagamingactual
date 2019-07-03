 module.exports = {
	name: 'cc',
	description: 'Command Create',
	execute(message, args) {
    		if (!message.member.permissions.has('MANAGE_MESSAGES')) {message.channel.send("``Moderators only``");return}
   		if (args.length < 2) {msg.send("``!cc [command] [response]``");return}
    		if (client.commands.has(args[0].toLowerCase())) {msg.send("``This command already exists``");return}
    		client.commands.set(args.shift().toLowerCase(), args.join(" "));
    		msg.send("``Command has been made``");
	},
};
