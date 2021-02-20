const Discord = require('discord.js')

module.exports = {
    isResultAccurate: function (bot, message, author) {
        const trigger = '❌'
        let botReaction
        message.react(trigger)
        .then( reaction => {
            botReaction = reaction
        })
        .catch(console.error)
        const filter = (reaction, user ) => reaction.emoji.name === trigger &&  user.id === author.id
        const feedback = message.createReactionCollector(filter, { time : 7000 })
        feedback.on('collect', reaction => {
            message.delete({ timeout: 1000, reason: 'It had to be done.' })
                console.log("deleted")
            }
        )
        feedback.on('end', collected => {
        if (collected.size === 0)
        {
            botReaction.remove(bot.user)
        }
        })
    }
}
