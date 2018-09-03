
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const prefix = "!";
const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");
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
  var commandi = JSON.parse(fs.readFileSync("./commands.json", "utf8"));
  var warnings = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
  if (message.isMentioned("464042836032225281")) {
    var hello = config.hello[Math.floor(Math.random()*config.hello.length)];
    message.channel.send(hello);
  }
 if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (command === "ban") {
      if (message.member.permissions.has('ADMINISTRATOR')) {
       var mention = message.mentions.members.first();
    if (message.isMentioned(mention)) {
      mention.ban();
    message.channel.send(`${mention} has been banned.`);
   
  }
    else {
      message.channel.send(`You have to mention someone!`);
    }
     } else {
       message.channel.send("Nope!");
     }
  }
  if (command === "cah") {
    var randomCAH = config.whiteCard[Math.floor(Math.random()*config.whiteCard.length)];
    message.channel.send({embed: {
    color: 15844367,
    author: {
      name: `${message.author.username} says...`,
      icon_url: message.author.avatarURL
    },
    title: `${argu}\n${randomCAH}`,
    }
    })
    message.delete();
    console.log(`${message.author.username} in ${message.channel.name} used the cah command.`);
  }
  //build-a-b̶e̶a̶r̶ command
  function checkexist(x) {
    return args[0] != x;
  }
   if (command === "cc") {
     if (message.member.permissions.has('ADMINISTRATOR') && config.exist.every(checkexist)) {
         if (args[0] != ""  && argo != "") {
     if (!commandi[args[0]]) commandi[args[0]] = {
         command:argo,
       };else {
         message.channel.send("That command already exists!");
         return;
       }
       fs.writeFile("./commands.json", JSON.stringify(commandi), (err) => {
          if (err) console.error(err)
  });
  var userWarns = commandi[args[0]] ? commandi[args[0]].command : argo;
     message.channel.send(`${args[0]} now does \'${userWarns}\'`);
   } else {
     message.channel.send("To make a command, type \n``!cc [command you want to call] [text you want the bot to say]``");
   }
   } else {
     message.channel.send("Nope!");
     }
     }
  if (commandi[command]) {
    var userWarns = commandi[command] ? commandi[command].command:args[1];
    message.channel.send(userWarns);
  }
  var bam = 0;
  if (command === "cclist") { 
    var commandlist = Object.keys(commandi)
 if (commandlist.length != 0) {
   var bam = commandlist;
 } else {
   var bam = "There are no commands!";
 }
   message.channel.send({"embed": {
    "color": 3498293,
    timestamp: new Date(),
    "title": `CC commands currently in use`,
        fields: [{
          name: "Commands",
          value: `${bam}`,
          inline: true
        }
          ],
      }
     }); 
  }
  if(command === "ccdel") {
    if (message.member.permissions.has('ADMINISTRATOR')) {
    if (commandi[args[0]]) {
      delete commandi[args[0]];
       fs.writeFile("./commands.json", JSON.stringify(commandi), (err) => {
          if (err) console.error(err)
       });
       message.channel.send(`Command ${args[0]} has been deleted!`);
    } else {
      message.channel.send("That command doesn't exist!");
    }
  } else {
  message.channel.send("Nope!");
  }
  }
  //no more building!
  if (command === "kick") {
     if (message.member.permissions.has('ADMINISTRATOR')) {
       var mention = message.mentions.members.first();
    if (message.isMentioned(mention)) {
    message.channel.send(`${mention} has been kicked.`);
  }
    else {
      message.channel.send(`You have to mention someone!`);
    }
     } else {
       message.channel.send("Nope!");
     }
  }
   if (command === "restart"){
     function resetBot(channel) {
    channel.send("I'll be back shortly!")
    .then(msg => client.destroy())
    .then(() => client.login(config.token));
}
 if (message.member.permissions.has('MANAGE_MESSAGES')) {
resetBot(message.channel);
 } else {
   message.channel.send("Nope!");
 }
   } 
  if (command.startsWith("scp-")&&num >= 1 && num <= 4000) {
    if (num.toString().length === 1) { 
      var scp = "00"+`${num}`;      
    }
     if (num.toString().length === 2) {
      var scp = "0"+`${num}`;      
    }
     if (num.toString().length === 3) {
      var scp =`${num}`;   
    }
     if (num.toString().length === 4) {
      var scp = `${num}`;    
    } 
    if(command.endsWith("-j")) {
      message.channel.send(`http://www.scp-wiki.net/scp-${scp}-j`);
    } else {
     message.channel.send(`http://www.scp-wiki.net/scp-${scp}`);
     }
  }
   if (command === "hug") {
    var mention = message.mentions.members.first();
    if (message.isMentioned(mention)) {
    message.channel.send(`(>^_^)> ${mention} <(^.^<)`)
  }
    else 
      message.channel.send(`(>^_^)> ${message.author} <(^.^<)`)
  }
  if (command === "donate") {
      message.channel.send("Donate here: https://www.paypal.com/pools/c/839i9RcUvF")
}
  if (command === "purge" && !isNaN(args[0])) {

    if (message.member.permissions.has('VIEW_AUDIT_LOG')) {
    var numb = args[0]
    message.channel.bulkDelete(numb);
        message.channel.send(`${numb} messages deleted!`)
  .then(msg => {
    msg.delete(5000);
  })
  .catch();
    }
    else
      message.channel.send("Nope.");
  }
 if (command === "support") {
   message.channel.send("No worries, a staff member will be with you soon!")
  client.channels.get("442726774909042689").send(`<@&432338355683065856>, ${message.author} is having a bit of a problem in ${message.channel}`);
  }
  if (command === "commands") {
    message.channel.send("You have been messaged the commands!")
    message.author.send({"embed": {
    "color": 3947583,
    "title": "Use prefix '!'",
        fields: [
          {
          name: "scp-[Any number between 1 and 3999](-j opional)",
          value: "Links to that SCP's page."
        },
                 {
          name: "hug",
          value: "Gives a hug to you or the person you mention!"
        },
                 {
          name: "donate",
          value: "Links to the official Kurva PayPal page!"
        },
                 {
          name: "commands",
          value: "You *just* did it."
        },
                 {
          name: "support",
          value: "Tells a staff member that you need help. Do not abuse it or there will be consequences."
        },
          {
          name: "kgmeme",
          value: "Give you a free Kurva Gaming certified meme."
        },
         {
          name: "ss0, 1, 2, 3, k",
          value: "Tells you the current status of the server."
        },
        {
          name: "8ball",
          value: "Answers your question *very* truthfully."
        },
         {
          name: "cah",
          value: "Continues your sentence with a white card from Cards Against Humanity!"
        },
                 {
          name: "purge\nADMIN ONLY",
          value: "Deletes specified number of messages."
        },
         {
          name: "status\nADMIN ONLY",
          value: "Sets the **Playing** message for the bot."
        },
         {
          name: "ping\nOWNER ONLY",
          value: "Pings a person the given number of times.\nUp to 5 reccomended."
        },
        {
          name: "restart\nMOD ONLY",
          value: "Restarts the bot."
        },
         {
          name: "vote\nADMIN ONLY",
          value: "Starts a vote!"
        },
        {
          name: "cc (command) (text)\nADMIN ONLY",
          value: "The bot will say the (text) when you do !(command)."
        },
        {
          name: "ccdel (command)\nADMIN ONLY",
          value: "The command will be deleted from existance."
        },
         {
          name: "cclist",
          value: "Lists all CC commands currently in use."
        },
       ],
      }
     });
  }
  if (command === "count") {
    message.channel.send(`There are ${message.guild.memberCount} people in the discord!`);
  }
  if (command === "say" && args[0].length === 21) {
    if (message.member.permissions.has('ADMINISTRATOR')) {
    var gsg = args[0].slice(2, 20);
    var argo = argu.replace(`${args[0]}`, "");
     message.guild.channels.get(`${gsg}`).send(`${argo}`);
     console.log(`${message.author.username} said ${argo} in ${gsg}.`);
  }
  else {
  message.channel.send("Nope.");
  }
  }
  //northern border to moderation nation
  var onmods = [];
  var onadmins = [];
  var onseniors = [];
  if (command === "mods") {
  var allsenior = (message.guild.roles.get('432355512584110113').members.map(m=>m.user).join('\n'));
  var allmod = (message.guild.roles.get('432337866493001740').members.map(m=>m.user).join('\n'));
  var alladmin = (message.guild.roles.get('432337534794727425').members.map(m=>m.user).join('\n'));
  function onmod() {
    var i;
    for (i = 0; i < message.guild.roles.get('432337866493001740').members.array().length; i++) { 
    if(message.guild.roles.get('432337866493001740').members.array()[i].presence.game!=null){
      if(message.guild.roles.get('432337866493001740').members.array()[i].presence.game.name==='SCP: Secret Laboratory'){
        onmods.push(message.guild.roles.get('432337866493001740').members.array()[i].user);
      }
    }
}
  }
  function onsenior() {
    var i;
    for (i = 0; i < message.guild.roles.get('432355512584110113').members.array().length; i++) { 
    if(message.guild.roles.get('432355512584110113').members.array()[i].presence.game!=null){
      if(message.guild.roles.get('432355512584110113').members.array()[i].presence.game.name==='SCP: Secret Laboratory'){
        onseniors.push(message.guild.roles.get('432355512584110113').members.array()[i].user);
      }
    }
}
  }
    function onadmin() {
    var i;
    for (i = 0; i < message.guild.roles.get('432337534794727425').members.array().length; i++) { 
    if(message.guild.roles.get('432337534794727425').members.array()[i].presence.game!=null){
      if(message.guild.roles.get('432337534794727425').members.array()[i].presence.game.name==='SCP: Secret Laboratory'){
        onadmins.push(message.guild.roles.get('432337534794727425').members.array()[i].user);
      }
    }
}
  }
  onmod();

  onadmin();
  onsenior();
   message.channel.send({"embed": {
    "color": 857707,
    timestamp: new Date(),
    "title": `Kurva Gaming Official Servers`,
    "thumbnail":{
      "url": "https://i.imgur.com/QTZC9gA.png"
    },
    "footer": {
      "icon_url": "https://cdn1.iconfinder.com/data/icons/color-bold-style/21/08-512.png",
      "text": "Please call for any in-game mod before anyone else!"
    },
     "author": {
      "name": "Currently available Moderators",
      "icon_url": "https://vignette.wikia.nocookie.net/roblox/images/c/ce/Police_Sergeants_Cap.png/revision/latest?cb=20170211084322"
     },
        fields: [{
          name: "Mods",
          value: `All: ${allmod}`,
          inline: true
        },
        {
          name: "Mods",
          value: `In-game: ${onmods.join(', ')}`,
          inline: true
        },
        {
          name: "Senior mods",
          value: `All: ${allsenior}`,
          inline: true
        },
                         {
          name: "Senior mods",
          value: `In-game: ${onseniors.join(', ')}`,
          inline: true
        },
        {
          name: "Admins",
          value: `All: ${alladmin}`,
          inline: true
        },
                 {
          name: "Admins",
          value: `In-game: ${onadmins.join(', ')}`,
          inline: true
        }
          ],
      }
     }); 
  }
  if (command === "offline") {
    //mod
    if (message.member.roles.has("432337866493001740")) {
      message.member.removeRole("432337866493001740");
      message.member.addRole("471095786554523658");
      message.channel.send(`${message.author} is now offline.`);
      message.delete();
    } 
    //senior
        else if (message.member.roles.has("432355512584110113")) {
      message.member.removeRole("432355512584110113");
      message.member.addRole("477195100867526689");
      message.channel.send(`${message.author} is now offline.`);
      message.delete();
    } 
    //admin
        else if (message.member.roles.has("432337534794727425")) {
      message.member.removeRole("432337534794727425");
      message.member.addRole("477195674421821451");
      message.channel.send(`${message.author} is now offline.`);
      message.delete();
    } else {
      message.channel.send("Nope!");
    }
  }
    if (command === "online") {
      //mod
      if (message.member.roles.has("471095786554523658")) {
      message.member.addRole("432337866493001740");
      message.member.removeRole("471095786554523658");
      message.channel.send(`${message.author} is now online.`);
      message.delete();
    } 
      //senior
      else if (message.member.roles.has("477195100867526689")) {
      message.member.addRole("432355512584110113");
      message.member.removeRole("477195100867526689");
      message.channel.send(`${message.author} is now online.`);
      message.delete();
    }
      //admin
      else if (message.member.roles.has("477195674421821451")) {
      message.member.addRole("432337534794727425");
      message.member.removeRole("477195674421821451");
      message.channel.send(`${message.author} is now online.`);
      message.delete();
    } else {
      message.channel.send("Nope!");
    }
  }
  //southern border to moderaton nation
  if (command === "kgmeme") {
    var embedPic = config.ourArray[Math.floor(Math.random()*config.ourArray.length)];
   message.channel.send(embedPic); 
    console.log(`${message.author.username} in ${message.channel.name} used the kgmeme command.`);
  }
  if (command === "status") {
      if (message.member.permissions.has('ADMINISTRATOR')) {
  var statusgame = argu
  client.user.setActivity(`${statusgame}`);
  }
   else {
  message.channel.send("Nope.");
  }
  }
 
   if (command === "8ball" && argu != "") {
    console.log(`${message.author.username} in ${message.channel.name} used the 8ball command.`);
    var randomResponse = config.myArray[Math.floor(Math.random()*config.myArray.length)];
    message.channel.send(`${message.author}'s question was '${argu}' \nThe magic 8 ball says... '` + randomResponse + `'`);
    message.delete();
  }
 
if (command === "ping" && !isNaN(args[1]) && message.isMentioned(message.mentions.members.first())) {
  if (message.guild.ownerID === message.author.id) {
  var step;
  if (args[1] <= 5) {
for (step = 0; step < args[1]; step++) {
  message.channel.send(`${args[0]}`);
}
  } else {
    for (step = 0; step < args[1]; step+=5) {
  message.channel.send(`${args[0]} ${args[0]} ${args[0]} ${args[0]} ${args[0]}`);
}
  }
} else {
  message.channel.send("Nope.");
}
}
  if (command === "vote" && argu != "") {
 if (message.member.permissions.has('ADMINISTRATOR')) {
    message.channel.send({embed: {
    color: 15844367,
    author: {
      name: `${message.author.username} is calling a vote!`,
      icon_url: message.author.avatarURL
    },
    title: `${argu}`,
    }
    }).then(newMessage => {
   newMessage.react('✅')
   newMessage.react('❌')
        // (catch errors)
        .catch(console.error);
    })
    // (catch errors)
    .catch(console.error);
    message.delete();  
}
  else {
  message.channel.send("Nope.");
  }
  }
  //oh look the servers isnt that neat
   if (message.channel.id === "442739266909503489" || message.channel.id === "444670578784337920" || message.channel.id === "464091801331040297") {
 var theip = 6;
 var title = 6;
 var portEnd = 6;

 if (command === "players") {
     var serverArray = []
  for (var i = 1; i < 6; i++) { 
    request('https://api.scpslgame.com/lobbylist.php?format=json', function(err, resp, html) {
      console.log(err)
        if (!err){
    console.log('gg');
              var json = JSON.parse(html);
     if ("error" in json) {
     console.log("Someone help me!");
     } else {
      
       var obj = json.find(o => o.ip === "192.223.31.157" && o.port === 7776+i);
          if(!obj) {
            console.log("offline");
           serverArray.push("Server "+i+" "+"Offline"); 
          } else {
            console.log("Server "+i+" "+obj.players);
            serverArray.push("Server "+i+" "+obj.players);
          }
     } 
            }
         
});
   }
   console.log(serverArray)
 message.channel.send(serverArray.join("\n"));
 }
if (command === "ss1" || command === "ss2" || command === "ss3" || command === "ss4" || command === "ss5" || command === "ssd") {
  if (command === "ss1") {
    var title = "Kurva Gaming Dedicated Server #1";
    var portEnd = "7777"; 
    var theip = "192.223.31.157"
  } else if (command === "ss2") {
    var title = "Kurva Gaming Dedicated Server #2";
    var portEnd = "7778";
    var theip = "192.223.31.157"
  } else if (command === "ss3") {
    var title = "Kurva Gaming Dedicated Server #3";
    var portEnd = "7779";
    var theip = "192.223.31.157"
  } else if (command === "ss4") {
    var title = "Kurva Gaming Dedicated Server #4";
    var portEnd = "7780";
    var theip = "192.223.31.157"
  } else if (command === "ss5") {
    var title = "Kurva Gaming Dedicated Server #5";
    var portEnd = "7781";
    var theip = "192.223.31.157"
  } else if (command === "ssd") {
    var title = "Kurva Gaming Dedicated Server but different";
    var portEnd = "7778"
    var theip = "192.223.27.212";
  }
      request('https://api.scpslgame.com/lobbylist.php?format=json', function(err, resp, html) {
        if (!err){
    {
              var json = JSON.parse(html);
     if ("error" in json) {
     console.log("Someone help me!");
     } else {
       var obj = json.find(o => o.ip === theip && o.port === portEnd);
          if(!obj) {
           message.channel.send({"embed": {
    "color": 9245716,
    timestamp: new Date(),
    "title": `${title}`,
     "author": {
      "name": "SCP Secret Laboratory [OFFLINE]",
      "icon_url": "http://scp-sl.wdfiles.com/local--files/nav:side/scp-sl-logo.png"
     },
        fields: [{
          name: "IP:",
          value: `${theip}`,
          inline: true
        },
        {
          name: "PORT:",
          value: `${portEnd}`,
          inline: true
        },
        {
          name: "PLAYERS:",
          value: 'N/A',
          inline: true
        }
          ],
      }
     }); 
          } else {
            var playerCount = obj.players
                     message.channel.send({"embed": {
    "color": 3498293,
    timestamp: new Date(),
    "title": `${title}`,
     "author": {
      "name": "SCP Secret Laboratory",
      "icon_url": "http://scp-sl.wdfiles.com/local--files/nav:side/scp-sl-logo.png"
     },
        fields: [{
          name: "IP:",
          value: `${theip}`,
          inline: true
        },
        {
          name: "PORT:",
          value: `${portEnd}`,
          inline: true
        },
        {
          name: "PLAYERS:",
          value: `${playerCount}`,
          inline: true
        }
          ],
      }
     });  
          }
     } 
            }
      }    
});

 }
  if (command === "ss0"||command === "ssk") {
if (command === "ss0") {
  var title = "Official SCP: Secret Laboratory Server";
  var theip = "192.223.27.212";
}
if (command === "ssk") {
  var title = "Kurva Gaming Dedicated Server ver. Kryp";
  var theip = "94.16.121.15";
}
          request(`https://kigen.co/scpsl/getinfo.php?ip=${theip}&port=7777`, function(err, resp, html) {
        if (!err){
          var $ = cheerio.load(html); 
          
            if (html === '{"error":"Server not found"}') {
          request(`https://kigen.co/scpsl/getinfo.php?ip=${theip}&port=7778`, function(err, resp, html) {
        if (!err){
          var $ = cheerio.load(html); 
          
            if (html === '{"error":"Server not found"}') {
          request(`https://kigen.co/scpsl/getinfo.php?ip=${theip}&port=7779`, function(err, resp, html) {
        if (!err){
          var $ = cheerio.load(html); 
          
            if (html === '{"error":"Server not found"}') {
          request(`https://kigen.co/scpsl/getinfo.php?ip=${theip}&port=7780`, function(err, resp, html) {
        if (!err){
          var $ = cheerio.load(html); 
          
            if (html === '{"error":"Server not found"}') {
          request(`https://kigen.co/scpsl/getinfo.php?ip=${theip}&port=7781`, function(err, resp, html) {
        if (!err){
          var $ = cheerio.load(html); 
          
            if (html === '{"error":"Server not found"}') {
          request(`https://kigen.co/scpsl/getinfo.php?ip=${theip}&port=7782`, function(err, resp, html) {
        if (!err){
          var $ = cheerio.load(html); 
          
            if (html === '{"error":"Server not found"}') {
          request(`https://kigen.co/scpsl/getinfo.php?ip=${theip}&port=7783`, function(err, resp, html) {
        if (!err){
          var $ = cheerio.load(html); 
          
            if (html === '{"error":"Server not found"}') {
          request(`https://kigen.co/scpsl/getinfo.php?ip=${theip}&port=7784`, function(err, resp, html) {
        if (!err){
          var $ = cheerio.load(html); 
          
            if (html === '{"error":"Server not found"}') {
          message.channel.send({"embed": {
    "color": 9245716,
    timestamp: new Date(),
    "title": `${title}`,
     "author": {
      "name": "SCP Secret Laboratory [OFFLINE]",
      "icon_url": "http://scp-sl.wdfiles.com/local--files/nav:side/scp-sl-logo.png"
     },
        fields: [{
          name: "IP:",
          value: `${theip}`,
          inline: true
        },
        {
          name: "PORT:",
          value: "N/A",
          inline: true
        },
        {
          name: "PLAYERS:",
          value: 'N/A',
          inline: true
        }
          ],
      }
     }); 
            }
            else {
            var json = JSON.parse(html);
     
     if ("error" in json) {
     console.log("wtf0");
     } else {
          var playerCount = json.players;
          
     }
            message.channel.send({"embed": {
    "color": 3498293,
    timestamp: new Date(),
    "title": `${title}`,
     "author": {
      "name": "SCP Secret Laboratory",
      "icon_url": "http://scp-sl.wdfiles.com/local--files/nav:side/scp-sl-logo.png"
     },
        fields: [{
          name: "IP:",
          value: `${theip}`,
          inline: true
        },
        {
          name: "PORT:",
          value: "7784",
          inline: true
        },
        {
          name: "PLAYERS:",
          value: `${playerCount}`,
          inline: true
        }
          ],
      }
     });  
            }
      }    
});
            }
            else {
            var json = JSON.parse(html);
     
     if ("error" in json) {
     console.log("wtf0");
     } else {
          var playerCount = json.players;
          
     }
            message.channel.send({"embed": {
    "color": 3498293,
    timestamp: new Date(),
    "title": `${title}`,
     "author": {
      "name": "SCP Secret Laboratory",
      "icon_url": "http://scp-sl.wdfiles.com/local--files/nav:side/scp-sl-logo.png"
     },
        fields: [{
          name: "IP:",
          value: `${theip}`,
          inline: true
        },
        {
          name: "PORT:",
          value: "7783",
          inline: true
        },
        {
          name: "PLAYERS:",
          value: `${playerCount}`,
          inline: true
        }
          ],
      }
     });  
            }
      }    
});
            }
            else {
            var json = JSON.parse(html);
     
     if ("error" in json) {
     console.log("wtf0");
     } else {
          var playerCount = json.players;
          
     }
            message.channel.send({"embed": {
    "color": 3498293,
    timestamp: new Date(),
    "title": `${title}`,
     "author": {
      "name": "SCP Secret Laboratory",
      "icon_url": "http://scp-sl.wdfiles.com/local--files/nav:side/scp-sl-logo.png"
     },
        fields: [{
          name: "IP:",
          value: `${theip}`,
          inline: true
        },
        {
          name: "PORT:",
          value: "7782",
          inline: true
        },
        {
          name: "PLAYERS:",
          value: `${playerCount}`,
          inline: true
        }
          ],
      }
     });  
            }
      }    
});
            }
            else {
            var json = JSON.parse(html);
     
     if ("error" in json) {
     console.log("wtf0");
     } else {
          var playerCount = json.players;
          
     }
            message.channel.send({"embed": {
    "color": 3498293,
    timestamp: new Date(),
    "title": `${title}`,
     "author": {
      "name": "SCP Secret Laboratory",
      "icon_url": "http://scp-sl.wdfiles.com/local--files/nav:side/scp-sl-logo.png"
     },
        fields: [{
          name: "IP:",
          value: `${theip}`,
          inline: true
        },
        {
          name: "PORT:",
          value: "7781",
          inline: true
        },
        {
          name: "PLAYERS:",
          value: `${playerCount}`,
          inline: true
        }
          ],
      }
     });  
            }
      }    
});
            }
            else {
            var json = JSON.parse(html);
     
     if ("error" in json) {
     console.log("wtf0");
     } else {
          var playerCount = json.players;
          
     }
            message.channel.send({"embed": {
    "color": 3498293,
    timestamp: new Date(),
    "title": `${title}`,
     "author": {
      "name": "SCP Secret Laboratory",
      "icon_url": "http://scp-sl.wdfiles.com/local--files/nav:side/scp-sl-logo.png"
     },
        fields: [{
          name: "IP:",
          value: `${theip}`,
          inline: true
        },
        {
          name: "PORT:",
          value: "7780",
          inline: true
        },
        {
          name: "PLAYERS:",
          value: `${playerCount}`,
          inline: true
        }
          ],
      }
     });  
            }
      }    
});
            }
            else {
            var json = JSON.parse(html);
     
     if ("error" in json) {
     console.log("wtf0");
     } else {
          var playerCount = json.players;
          
     }
            message.channel.send({"embed": {
    "color": 3498293,
    timestamp: new Date(),
    "title": `${title}`,
     "author": {
      "name": "SCP Secret Laboratory",
      "icon_url": "http://scp-sl.wdfiles.com/local--files/nav:side/scp-sl-logo.png"
     },
        fields: [{
          name: "IP:",
          value: `${theip}`,
          inline: true
        },
        {
          name: "PORT:",
          value: "7779",
          inline: true
        },
        {
          name: "PLAYERS:",
          value: `${playerCount}`,
          inline: true
        }
          ],
      }
     });  
            }
      }    
});
            }
            else {
            var json = JSON.parse(html);
     
     if ("error" in json) {
     console.log("wtf0");
     } else {
          var playerCount = json.players;
          
     }
            message.channel.send({"embed": {
    "color": 3498293,
    timestamp: new Date(),
    "title": `${title}`,
     "author": {
      "name": "SCP Secret Laboratory",
      "icon_url": "http://scp-sl.wdfiles.com/local--files/nav:side/scp-sl-logo.png"
     },
        fields: [{
          name: "IP:",
          value: `${theip}`,
          inline: true
        },
        {
          name: "PORT:",
          value: "7778",
          inline: true
        },
        {
          name: "PLAYERS:",
          value: `${playerCount}`,
          inline: true
        }
          ],
      }
     });  
            }
      }    
});
            }
            else {
            var json = JSON.parse(html);
     
     if ("error" in json) {
     console.log("wtf0");
     } else {
          var playerCount = json.players;
          
     }
            message.channel.send({"embed": {
    "color": 3498293,
    timestamp: new Date(),
    "title": `${title}`,
     "author": {
      "name": "SCP Secret Laboratory",
      "icon_url": "http://scp-sl.wdfiles.com/local--files/nav:side/scp-sl-logo.png"
     },
        fields: [{
          name: "IP:",
          value: `${theip}`,
          inline: true
        },
        {
          name: "PORT:",
          value: "7777",
          inline: true
        },
        {
          name: "PLAYERS:",
          value: `${playerCount}`,
          inline: true
        }
          ],
      }
     });  
            }
      }    
});
  }
   }
});
client.on('guildMemberAdd', (member) => {
    member.guild.channels.get('439751531353341954').send(`${member} welcome :)`); 
});
client.login(process.env.BOT_TOKEN);
