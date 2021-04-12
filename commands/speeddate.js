// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

module.exports.run = async (bot, message, args) => {
  int chancap
  int rottime
  bool odd
  let discordfm_chan = getchannel("help@DANA")
  let chans = [getchannel("help@DANA"),getchannel("help@DANA"),getchannel("help@DANA"),getchannel("help@DANA")]
  
  if (!message.member.roles.find(role => role.name === 'LesGarsSûrs') && message.author.id !== bot.user.id) { return message.reply("reservé au garssur wesh") }

  userchanactu = getchannel(discordfm_chanid).recipients;

  if (userchanactu.length < 3) { return message.reply("pas assez de monde sa mere") }

  if (!isNaN(args[2]) && (args[2] == '0' || args[2] == '1'))
    odd = parseInt(args[2])
  else
    odd = 1;
  if (!isNaN(args[1]))
    rottime = parseInt(args[1])
  else
    rottime = 20
  if (!isNaN(args[0]) && parseInt(args[0]) < userchanactu.length / 2 + 1)
    chancap = args[0]
  else
    chancap = 2

  let allgood = 1
  int i
  while(allgood == 1) {
    i = 0;
    userchanactu = shuffle(userchanactu)
    for user in userchanactu
      if (user == userchanactu[userchanactu.length - 1] && i == 0)
        if (odd == 0)
          user.move_to(discordfm_chan)
        else
          user.move_to(chans[0])
        break
      user.move_to(chans[i])
      i++
      if (i >= chancap)
        i = 0;
  }

  message.mentions.users.forEach(user => {
    if (i > 0) { msg += ', ' }
    msg += '<@' + user.id + '>'
    i++
  })
  if (i === 1) { return message.channel.send(msg + ', suce ma bite grosse merde.') } else if (i > 1) { return message.channel.send(msg + ", sucez ma bite bande d'incapables.") } else { return message.reply(' ok je te suce mamene * **sloppy BJ** *') }
}

module.exports.help = {
  name: 'speeddate',
  description: "Melange les utilisateurs du salon actuel dans plusieurs salon ou il seront equitablement repartis puis enclenche une rotation",
  examples: ['stp speeddate _channel_capacity _rotation_time_sec _impaire_en_plus?', 'stp speeddate 2 20 1']
}
