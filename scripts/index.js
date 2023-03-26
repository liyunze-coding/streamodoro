// get configs.commands
const commands = configs.customCommands;

ComfyJS.onCommand = (user, command, message, flags, extra) => {
	command = `!${command.toLowerCase()}`;
	if (commands.startTimerCommands.includes(command)) {
		let time = processTime(message);

		if (time[0] <= 0) {
			return ComfyJS.Say(`@${user} Invalid input!`);
		}

		startTimer(time[0]);
		updateStatus(message);

		ComfyJS.Say(
			`@${user} Timer started! ${time[1]} minutes ${time[2]} seconds`
		);
	} else if (commands.pauseTimerCommands.includes(command)) {
		pauseTimer();
		ComfyJS.Say(`@${user} Timer paused!`);
	} else if (commands.resumeTimerCommands.includes(command)) {
		resumeTimer();
		ComfyJS.Say(`@${user} Timer resumed!`);
	} else if (commands.resetTimerCommands.includes(command)) {
		resetTimer();
		ComfyJS.Say(`@${user} Timer reset!`);
	} else if (commands.setPomoCountCommands.includes(command)) {
		setPomoCount(user, message);
	} else if (commands.commandsResponses[command]) {
		ComfyJS.Say(commands[command].replace("{user}", user));
	}
};

ComfyJS.Init(auth.username, `oauth:${auth.oauth}`, [auth.channel]);
