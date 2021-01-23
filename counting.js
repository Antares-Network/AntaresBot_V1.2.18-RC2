	// Only do this for the counting channel of course
	if (bot.channels.cache.filter(c => c.name === 'counting').keyArray().includes(message.channel.id)) {
		// You can ignore all bot messages like this
		if (message.member.user.bot) return
		// If the message is the current count + 1...
		if (Number(message.content) === count + 1) {
			// ...increase the count
			count++
			// Remove any existing timeout to count
			if (timeout) bot.clearTimeout(timeout)
			// Add a new timeout
			timeout = bot.setTimeout(
				// This will make the bot count and log all errors
				() => message.channel.send(++count).catch(console.error),
				// after 30 seconds
				30000
			)
			// If the message wasn't sent by the bot...
		} else if (message.member.id !== bot.user.id) {
			// ...send a message because the person stuffed up the counting (and log all errors)
			message.delete()
			//message.channel.send(`${message.member} messed up!`).catch(console.error)
			// Reset the count
			//count = 0
			// Reset any existing timeout because the bot has counted so it doesn't need to
			// count again
			if (timeout) bot.clearTimeout(timeout)
		}
	}