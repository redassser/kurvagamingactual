
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const prefix = "!";
const request = require('request');
const cheerio = require('cheerio');
const Enmap = require('enmap');
const EnmapMongo = require("enmap-mongo");
client.commands = new Enmap({ provider: new EnmapMongo({
  name: `commands`,
  dbName: `commands`,
  url: process.env.MONGODB2
})
})
client.on("ready", () => {
  console.log("I am ready!");
  client.user.setActivity("!commands");
});

client.on("message", (message) => {
  var args = message.content.slice(prefix.length).trim().split(/ +/g);
  var command = args.shift().toLowerCase();
  var argu = args.join(" ")
  var argo = argu.replace(args[0], "");
  var num = parseInt(command.replace("scp-", ""), 10);
  var msg = message.channel;
  if (message.isMentioned("464042836032225281")) {
    var hello = config.hello[Math.floor(Math.random()*config.hello.length)];
    message.channel.send(hello);
  }
  //this is to heck the bots and non-prefixes
  if (!message.content.startsWith(prefix) || message.author.bot || msg.id === "490675505968840714") return;
  //mute command
  if (command === "mute") {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {msg.send("``Moderators only``");return}
    if (args.length != 1) {msg.send("``!mute [mention]``");return}
    var mention = message.mentions.members.first();
    if (!message.isMentioned(mention)) {msg.send("``Please mention someone``");return}
    if (mention.roles.has("465987375902883874")) {
      msg.send(mention+" ``has already been muted``")
    } else {
      mention.addRole("465987375902883874");
      msg.send(mention+" ``has been muted``")
    }
  }
  if (command === "unmute") {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {msg.send("``Moderators only``");return}
    if (args.length != 1) {message.channel.send("``!unmute [mention]``");return}
    var mention = message.mentions.members.first();
    if (!message.isMentioned(mention)) {msg.send("``Please mention someone``");return}
    if (!mention.roles.has("465987375902883874")) {
      msg.send(mention+" ``has not been muted``")
    } else {
      mention.removeRole("465987375902883874");
      msg.send(mention+" ``has been unmuted``")
    }
  }
  if (command === "cah") {
    var randomCAH = config.whiteCard[Math.floor(Math.random()*config.whiteCard.length)];
    let cah = new Discord.RichEmbed()
      .setTitle(argu+"\n"+randomCAH)
      .setColor("RANDOM")
      .setAuthor(message.author.username+" says...", message.author.avatarURL);
    msg.send(cah)
    message.delete();
    console.log(`${message.author.username} in ${message.channel.name} used the cah command.`);
  }
  
  //build-a-b̶e̶a̶r̶ command
  if (command === "cc") {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {msg.send("``Moderators only``");return}
    if (args.length < 2) {msg.send("``!cc [command] [response]``");return}
    if (client.commands.has(args[0].toLowerCase())) {msg.send("``This command already exists``");return}
    client.commands.set(args.shift().toLowerCase(), args.join(" "));
    msg.send("``Command has been made``");
  }
  if (client.commands.has(command)) {
    msg.send(client.commands.get(command))
  }
  if (command === "ccdel") {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {msg.send("``Moderators only``");return}
    if (args.length != 1) {msg.send("``!ccdel [command]``");return}
    if (!client.commands.has(args[0])) {msg.send("``This command does not exist``");return}
    client.commands.delete(args[0])
    msg.send("``Command successfuly deleted``")
  }
  if (command === "cclist") {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {msg.send("``Moderators only``");return}
    const array = client.commands.keyArray();
    const pagenum = 10;
    if (((args[0]*pagenum))>(array.length+pagenum)) {message.channel.send("``There aren't that many pages``");return;}
    if (!isNaN(args[0])) {
      var x = (args[0]*pagenum)-pagenum;
      var y = ((array.length)>(x+pagenum)) ? (x+pagenum) : array.length;
    } else {message.channel.send("``!cclist [pagenumber]``");return;}
    let listEmbed = new Discord.RichEmbed()
    .setTitle("CC command list")
    .setFooter("Page "+args[0]+" of "+Math.ceil(array.length/pagenum))
    if (array.length === 0) {message.channel.send("``No commands made``");return}
    for (var i = x; i < y; i++) {
      listEmbed.addField("!"+array[i],client.commands.get(array[i]));
    }
    message.channel.send(listEmbed);

  }
  //no more building!

  if (command.startsWith("scp-")&&num >= 0 && num <= 4000) {
    switch (num.toString().length) {
      case 1:
        var scp = "00"+num;break;
      case 2:
        var scp = "0"+num;break;
      case 3:
        var scp = num;break;
      case 4:
        var scp = num;break;
    }
    if(!command.endsWith("-j")) {message.channel.send(`http://www.scp-wiki.net/scp-${scp}`);return}
    msg.send(`http://www.scp-wiki.net/scp-${scp}-j`);
  }
  if (command === "hug") {
    var mention = message.mentions.members.first();
    if (!message.isMentioned(mention)) {msg.send(`(>^_^)> ${message.author} <(^.^<)`);return}
    msg.send(`(>^_^)> ${mention} <(^.^<)`)
  }
  if (command === "donate") {
    msg.send("Donate here: https://www.paypal.com/pools/c/839i9RcUvF")
  }
  if (command === "purge") {
    if (!message.member.permissions.has('VIEW_AUDIT_LOG')) {message.channel.send("``Senior staff only``");return}
    if (isNaN(args[0]) || args.length != 1) {message.channel.send("``!purge [number]``");return}
    msg.bulkDelete(args[0]);
    msg.send(`${args[0]} messages deleted!`)
    .then(mesg => {mesg.delete(5000)})
    .catch();   
  }
  if (command === "commands") {
    message.channel.send("You have been messaged the commands!")
    let helpstuff = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("User prefix ``!``")
      .addField("scp-[Any number between 1 and 3999](-j opional)", "Links to that SCP's page.")
      .addField("hug (mention optional)","Gives a hug to you or the person you mention!")
      .addField("donate","Links to the official Kurva PayPal page!")
      .addField("kgmeme", "Give you a free Kurva Gaming certified meme.")
      .addField("players", "Tells you the player count of server 0 through 5.")
      .addField("ss[0, 1, 2, 3, 4, 5]", "Tells you the current status of the server.")
      .addField("8ball","Answers your question *very* truthfully.")
      .addField("cah [sentence]", "Finishes your sentence with a white card from Cards Against Humanity!")
      .addField("purge [number]", "**Moderator** Deletes specified number of messages.")
      .addField("vote [topic]", "**Moderator** Starts a vote")
      .addField("cc (command) (text)", "**Moderator** The bot will say the (text) when you do !(command).")
      .addField("ccdel (command)","**Moderator** The command will be deleted from existance.")
      .addField("cclist","**Moderator** Lists all CC commands currently in use.");
    message.author.send(helpstuff);
  }
  if (command === "count") {
    msg.send(`There are ${message.guild.memberCount} people in the discord!`);
  }
  if (command === "say") {
    if (!message.guild.channels.get(args[0].slice(2, 20))) {msg.send("That's not a channel");return}
    if (!message.member.permissions.has('VIEW_AUDIT_LOG')) {msg.send("Senior Mods only.");return}
    var channelid = args[0].slice(2, 20);
    var argo = argu.replace(args[0], "");
    message.guild.channels.get(channelid).send(`${argo}`);
    console.log(message.author.username+" said "+argo+" in "+message.guild.channels.get(channelid));
  }

  if (command === "kgmeme") {
    var embedPic = config.ourArray[Math.floor(Math.random()*config.ourArray.length)];
    msg.send(embedPic); 
    console.log(`${message.author.username} in ${msg.name} used the kgmeme command.`);
  }
  if (command === "status") {
    if (!message.member.permissions.has('ADMINISTRATOR')) {msg.send("``Administrators only``");return}
    client.user.setActivity(`${argu}`);
  }
  if (command === "8ball") {
    if (!argu) {message.channel.send("``You didn't ask a question.``");return}
    console.log(`${message.author.username} in ${message.channel.name} used the 8ball command.`);
    var randomResponse = config.myArray[Math.floor(Math.random()*config.myArray.length)];
    msg.send(message.author+"'s question was "+argu+"\nThe magic 8 ball says..."+randomResponse);
    message.delete();
  }
 
  if (command === "ping") {
    let mention = message.mentions.members.first()
    if (args.length != 2) {msg.send("``!ping [mention] [number]``");return}
    if (!isNaN(args[1])) {msg.send("``That's not a number.``");return}
    if (message.isMentioned(mention)) {msg.send("``You have to mention someone.``");return}
    if (message.guild.ownerID != message.author.id) {msg.send("Owner only");return}
    var step;
    if (args[1] <= 5) {
      for (step = 0; step < args[1]; step++) {
        message.channel.send(`${args[0]}`);
      }
    } else {
      for (step = 0; step < args[1]; step+=5) {
        msg.send(args[0]+args[0]+args[0]+args[0]+args[0]);
      }
    }
  }
  if (command === "vote") {
    if (!argu) {msg.send("``You didnt't type anything.``");return}
    if (!message.member.permissions.has('VIEW_AUDIT_LOG')) {msg.send("``Senior Mods only.``");return}
    let voteem = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(message.author.username+" is calling a vote!")
      .setTitle(argu);
    message.channel.send(voteem)
    .then(newMessage => {
    newMessage.react('✅')
    newMessage.react('❌')
    .catch(console.error);
    })
    .catch(console.error);
    message.delete(); 
  }
  /*
  Server List for all servers, along with
  !players
  and the other !ss commands
  */
  var serverList = {ss1:["Kurva Gaming Dedicated Server #1","7777","147.135.30.221","Server 1"],
                    ss2:["Kurva Gaming Dedicated Server #2","7778","147.135.30.221","Server 2"],
                    ss3:["Kurva Gaming Dedicated Server #3","7779","147.135.30.221","Server 3"],
                    ss4:["Kurva Gaming Dedicated Server #4","7781","147.135.30.221","Server 4"],
                    ss0:["Official Server","7780","147.135.30.221","Offical Server"]
                   }
  if (message.channel.id != "442739266909503489" && message.channel.id != "486892954297040896" && message.channel.id != "464091801331040297") return;
  var theip; var title; var portEnd;
  if (command === "players") {
    var arra = [];
    request('https://api.scpslgame.com/lobbylist.php?format=json', function(err, resp, html) {
      if (!err){
        var arra = [];
        var json = JSON.parse(html);
        if ("error" in json) {
          console.log("Someone help me!");
        } else {
          var i;
          let playerList = new Discord.RichEmbed()
            .setColor("#4286f4")
            .setAuthor("SCP Secret Laboratory, Players","http://scp-sl.wdfiles.com/local--files/nav:side/scp-sl-logo.png")
          for (i=0;i<Object.keys(serverList).length;i++) {
            var now = Object.keys(serverList)[i]
            let ser = json.find(o => o.ip === serverList[now][2] && o.port === serverList[now][1])
            console.log(ser)
            if (!ser) {playerList.addField(serverList[now][3],"Offline", true)}
            else {playerList.addField(serverList[now][3],ser.players, true)}
          };
          message.channel.send(playerList)
        } 
      }  
    });
  }
  
  if (command in serverList)  {
    title = serverList[command][0];
    portEnd = serverList[command][1];
    theip = serverList[command][2];
  } else {return;}
    request('https://api.scpslgame.com/lobbylist.php?format=json', function(err, resp, html) {
      if (!err){
        {
          var json = JSON.parse(html);
          if ("error" in json) {
            console.log("Someone help me!");
          } else {
            var obj = json.find(o => o.ip === theip && o.port === portEnd);
            if(!obj) {
              let serverstatusoff = new Discord.RichEmbed()
                .setColor("#e51c1c")
                .setTitle(title)
                .setAuthor("SCP Secret Laboratory [OFFLINE]","http://scp-sl.wdfiles.com/local--files/nav:side/scp-sl-logo.png")                 .addField("IP:", theip, true)
                .addField("PORT:", portEnd, true)
                .addField("PLAYERS:", "N/A", true)
              message.channel.send(serverstatusoff); 
            } else {
              var playerCount = obj.players
              let serverstatuson = new Discord.RichEmbed()
                .setColor("#1de535")
                .setTitle(title)
                .setAuthor("SCP Secret Laboratory","http://scp-sl.wdfiles.com/local--files/nav:side/scp-sl-logo.png")
                .addField("IP:", theip, true)
                .addField("PORT:", portEnd, true)
                .addField("PLAYERS:", playerCount, true)
              message.channel.send(serverstatuson);
            }
          } 
        }   
      }
    });
});
client.login(process.env.BOT_TOKEN);
