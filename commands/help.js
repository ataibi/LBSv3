const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  let commands
  let category = args[0]
  if (category === 'musique') {
    commands = bot.musicCommands
  } else {
    commands = bot.commands
  }

  let ncommands = 0
  let categories = []
  commands.forEach(command => {
    if (!command.help.category) {
      command.help.category = 'autre'
    }
    if (category && command.help.category === category)
        ncommands++
    if (!categories.includes(command.help.category))
      categories.push(command.help.category)
  })
  if (!category) {
    return message.reply(`J'ai arreté le gros, jfais que du detail maintenant, choisis une de ces catégories pour avoir de l'aide :\n **_${categories.toString().replace(/,/g, ", ")}_**`)
  }
  if (ncommands === 0) {
    return message.reply(`Y'a pas de commande dans cette categorie. Essaie plutot une de ces categories : **_${categories.toString().replace(/,/g, ", ")}_**`)
  } else if (ncommands <= 14) {
    let helpMessage = (`**Voici les commandes de la categorie "${category.charAt(0).toUpperCase() + category.slice(1)}" :** `)
    commands.forEach(command => {
      if (category && command.help.category === category)
          helpMessage += `\n\n**${command.help.name}**: _${command.help.description}_ \nexemple(s) : _${command.help.examples}_`
    })
    try {
      message.author.send(helpMessage)
      message.reply("Je t'ai envoyé du renfort en MP")
    } catch (e) {
      message.reply("Eh maggle, j'peux pas t'envoyer de MP, on fait comment pour ta PLS là ?")
    }
  } else {
    try {
      message.author.send(`**Voici les commandes de la categorie "${category.charAt(0).toUpperCase() + category.slice(1)}" :** `)
        .then(() => {
          ncommands = 0
          let nPage = 0
          let helpMessage = ''
          commands.forEach(command => {
            if (category && command.help.category === category) {
              ncommands++
              if (ncommands >= 15) {
                message.author.send(helpMessage)
                helpMessage = ''
                nPage++
                ncommands = 0
              }
              console.log(`${[ncommands, command.help.name]}`)
              helpMessage += `\n\n**${command.help.name}**: _${command.help.description}_ \nexemple(s) : _${command.help.examples}_`
            } else {

            }
          })
          if (nPage > 0 && ncommands < 15) { message.author.send(helpMessage) }
        })
      message.reply("Je t'ai envoyé du renfort en MP mon mignon")
    } catch (e) {
      message.reply("Eh maggle, j'peux pas t'envoyer de MP, on fait comment pour ta PLS là ?")
    }
  }
}

module.exports.help = {
  name: 'aide',
  description: 'Pour les cas de PLS ultime, affiche l\'aide',
  examples: 'stp aide, stp aide musique, stp aide meme',
  category: 'utile'
}
