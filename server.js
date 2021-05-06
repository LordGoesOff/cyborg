const Aoijs = require("aoi.js");

const bot = new Aoijs.Bot({
  token: "your-bot-token-here",
  prefix: "your-bot-prefix-here"
});

bot.onMessage();

bot.readyCommand({
  channel: "channelid-for-restart-messages-to-show",
  code:
    "I was restarted. Either a automatic restart, or an update. Love you all!"
});


//variables
bot.variables({
  guess_the_number_channel: "",
  winning_number: "",
  gtntries: "0",
  gtn: "false",
  gtnwins: "0",
  gtnattempts: "0",
  gtnstatus: "No ongoing game.",
  n1: "",
  n2: ""
});
//get the number that users are trying to guess
bot.command({
    name: "gtnNumber",
    code: `$title[Guess The Number Winning Number]
$description[The winning number for GTN is $getservervar[winning_number].]
$onlyPerms[admin;You need to be an Admin to use this.]`
});
//stats of gtn in the server and stats of user
bot.command({
    name: "gtnstats",
    aliases: ['gtnstatistics'],
    code: `$title[Guess The Number Stats]
$description[GTN commands: disableGtn, gtnstats, gtn]
$addField[GTN Status;$getservervar[gtnstatus];yes]
$addField[GTN Channel;<#$getservervar[guess_the_number_channel]>;yes]
$addField[Wins;$getglobaluservar[gtnwins;$findmember[$message]];yes]
$addField[Total Attempts/Wins;$getglobaluservar[gtnattempts;$findmember[$message]];yes]
$thumbnail[$useravatar[$findmember[$message]]]`
});
//start a gtn game
bot.command({
    name: "gtn",
    aliases: ['guessthenumber'],
    code: `$setservervar[winning_number;$random[$message[1];$message[2]]]
$setservervar[guess_the_number_channel;$channelid]
$setservervar[gtn;true]
$setservervar[n1;$message[1]]
$setservervar[n2;$message[2]]
$setservervar[gtnstatus;There is an ongoing game of GTN in <#$channelID>]
$author[Guess the number!;$servericon]
$title[Alrighty!]
$description[I have got the number in mind. I have DMed you the number.]
$color[BLUE]
$channelSendMessage[$channelID;Guess the number has started! The number is from __$message[1] to $message[2]__. Good luck everybody!]
$sendDM[$authorID;The number for Guess The Number is $random[$message[1];$message[2]].
__Why are you getting this DM?__
You started a Guess The Number event in your server $servername.]
$onlyif[$isuserdmenabled==true;Your DMs are disabled. but the number is $random[$message[1];$message[2]]. Keep that number somewhere safe! {delete:5s}]
$onlyif[$message[1]<$message[2];You have provided the wrong input, please make sure the first number is the min number and the second the max number.]
$onlyif[$message[2]>=5;The max number has to be at least 5!]
$onlyif[$checkcontains[$message;q;w;e;r;t;y;u;i;o;p;a;s;d;f;g;h;j;k;lz;x;c;v;b;n;m]==false;You only need to use numbers as input.]
$argscheck[>2;Please provide a min number and a max number.]
$onlyperms[managechannels;No thanks, you don't have the managechannels permission which happens to be required for this to work.]`
});
//where it tells u if ur wrong or not
bot.command({
    name: "$alwaysExecute",
    code: `$setservervar[winning_number;Ended. start again with the gtn command.]
$setglobaluserVar[gtnwins;$sum[$getglobaluserVar[gtnwins];1]]
$setservervar[gtntries;0]
$setservervar[gtnstatus;Unfortunately, the last GTN round has ended.]
$setservervar[gtn;false]
$title[$randomText[Winner winner, chicken dinner.;Well well well.;We have a winner!;Congratulations!;You have won the GTN Event.;Woah, great job!;We're proud of you;Guess The Number has ended.;GTN;Woop woop.]]
$description[Looks like we have a winner..]
$addField[Correct Number;$getservervar[winning_number];yes]
$addField[Winner;$usertag;yes]
$addField[Tries;$getServerVar[gtntries];yes]
$color[BLUE]
$thumbnail[$authoravatar]
$footer[Guess The Number! +1 gtn wins added. Check stats with the gtnStats command!]
$onlyif[$message[1]==$getservervar[winning_number];Wrong number $usertag, it's not $message]
$setServerVar[gtntries;$sum[$getServerVar[gtntries];1]]
$setglobaluserVar[gtnattempts;$sum[$getglobaluserVar[gtnattempts];1]]
$onlyif[$message[1]>=$getservervar[n1];The number is a random number from $getservervar[n1] to $getservervar[n2]. You provided a number smaller than $getservervar[n1].]
$onlyif[$message[1]<=$getservervar[n2];The number is a random number from $getservervar[n1] to $getservervar[n2]. You provided a number bigger than $getservervar[n2].]
$onlyif[$getservervar[winning_number]!=Ended. start again with the gtn command.;Looks like the last gtn has ended, you will have to get a staff to re-set it up.]
$onlyif[$isNumber[$message]==true;]
$onlyif[$channelid==$getservervar[guess_the_number_channel];]
$onlyIf[$getservervar[gtn]==true;]`
});
//disable gtn
bot.command({
    name: "disablegtn",
    code: `Disabled.
$setservervar[gtntries;0]
$setservervar[guess_the_number_channel;Not set]
$setservervar[winning_number;0]
$suppressErrors[Error! here is the error. {error}]
$onlyperms[managechannels;No thanks, you don't have the managechannels permission which happens to be required for this to work.]`
});
//bot ping
bot.command({
    name: "ping",
    code: `Pinging..
$editIn[1s;:ping_pong: Pong!
Ping: $pingms
Bot Ping: $botPingms
Database Ping: $dbPingms]`
});
//help command
bot.command({
    name: "help", //command trigger
    code: `-gtn: Put two numbers, a random number from number 1, to number 2. You will be DMed that number.
-gtnStats: Your/The server's GTN stats.
-gtnNumber: Get the secret number that people are trying to guess!
-disablegtn: End the game of GTN.`
})
//invite the bot
bot.command({
    name: "invite", //command trigger
    code: `Invite me here: $getBotInvite`
})
//bot status
bot.status({
  text: "numbers. | -help | $serverCount servers",
  type: "LISTENING",
  time: 12
});
//bot stats, change message id and channel id to yours.
bot.loopCommand({
code: `
$editMessage[839935025935679507;{title:Stats}
{description:__Materials__
$cpu%/100% cpu
$ram/$maxRam ram
__Ping__
$numberseparator[$ping]ms regular ping
$numberseparator[$dbping] database ping
__Other Info__
$uptime uptime
$numberseparator[$servercount] servers
$numberseparator[$allmemberscount] users
$numberseparator[$allchannelscount] channels
$numberseparator[$allemojicount] emojis}
{footer:This updates every 30 seconds.}
{color:BLUE}]`,

channel: "839935010509553664",
executeOnStartup: true,
every: 30000
});
