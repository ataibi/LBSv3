const Discord = require('discord.js')

module.exports = {
    isResultAccurate: function (bot, message) {
        const trigger = '❌'
        message.react(trigger)
        .then(console.log(`reacted to ${message}`))
        .catch(console.error)
        const feedback = message.createReactionCollector(filter, { time : 7000 })
        feedback.on('collect', reaction => {
            if (reaction.emoji.name === trigger && reaction.users.find(user => user.id !== bot.user.id ))
            {
                message.delete(1000);
                console.log("deleted")
            }
        })
    }
}
