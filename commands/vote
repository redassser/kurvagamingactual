 module.exports = {
	name: 'vote',
	description: 'Set up a vote',
	execute(message, args) {
    		if (!args.join(" ")) {msg.send("``You didnt't type anything.``");return}
    		if (!message.member.permissions.has('VIEW_AUDIT_LOG')) {message.channel.send("``Senior Mods only.``");return}
		const Discord = require("discord.js");
    		let voteem = new Discord.RichEmbed()
      		.setColor("RANDOM")
      		.setAuthor(message.author.username+" is calling a vote!")
      		.setTitle(args.join(" "));
    		message.channel.send(voteem)
    		.then(newMessage => {
    			newMessage.react('✅')
    			newMessage.react('❌')
    			.catch(console.error);
    		})
    		.catch(console.error);
    		message.delete(); 
	},
};
