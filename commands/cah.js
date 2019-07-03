module.exports = {
	name: 'cah',
	description: 'Cards Against Humanity',
	execute(message, args) {
		const config = require("./config.json");
		const Discord = require("discord.js");
		var randomCAH = config.whiteCard[Math.floor(Math.random()*config.whiteCard.length)];
		let cah = new Discord.RichEmbed()
		.setTitle(args.join(" ")+"\n"+randomCAH)
		.setColor("RANDOM")
		.setAuthor(message.author.username+" says...", message.author.avatarURL);
		message.channel.send(cah)
		message.delete();
	},
};
