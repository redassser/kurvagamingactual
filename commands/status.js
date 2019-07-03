module.exports = {
	name: 'status',
	description: 'Change the status',
	execute(message, args) {
		if (!message.member.permissions.has('ADMINISTRATOR')) {message.channel.send("``Administrators only``");return}
	    	client.user.setActivity(args.join(" "));
	},
};
