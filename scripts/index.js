// feel free to add/edit responding commands here
const commands = {
    'taskhelp': `{user} "!task [task]" to add your task to the list; "!done" when you're done with your task; "!remove" if you made a typo in the previous task.`,
    'ryanpython': `@RyanPython helped make this bot possible. Follow him on twitch.tv/RyanPython <3`
}

ComfyJS.Init("YOUR CHANNEL HERE", "oauth:PUT TOKEN HERE");
//ComfyJS.Init("YOUR BOT ACCOUNT", "oauth:ACCESS_TOKEN_HERE", 'YOUR CHANNEL') // use this if you're using a different account from your broadcasting account