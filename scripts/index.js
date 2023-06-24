// get configs.commands
const commands = configs.customCommands;
const enabledEnforce = configs.enforcement.enableEnforce;

let enforceCommandChat = true;

const twitchBots = configs.enforcement.twitchBots;

// check permissions if user is mod or broadcaster

ComfyJS.onCommand = (user, command, message, flags, extra) => {
	command = `!${command.toLowerCase()}`;
	const isMod = flags.broadcaster || flags.mod;

	if (commands.startTimerCommands.includes(command) && isMod) {
		let time = processTime(message);

		if (time[0] <= 0) {
			return ComfyJS.Say(`@${user} Invalid input!`);
		}

		if (timerRunning) {
			return ComfyJS.Say(`@${user} Timer already started!`);
		}

		startTimer(time[0]);

		updateStatus(message);

		ComfyJS.Say(
			`@${user} Timer started! ${time[1]} minutes ${time[2]} seconds`
		);
	} else if (commands.pauseTimerCommands.includes(command) && isMod) {
		pauseTimer();
		ComfyJS.Say(`@${user} Timer paused!`);
	} else if (commands.resumeTimerCommands.includes(command) && isMod) {
		resumeTimer();
		ComfyJS.Say(`@${user} Timer resumed!`);
	} else if (commands.resetTimerCommands.includes(command) && isMod) {
		resetTimer();
		ComfyJS.Say(`@${user} Timer reset!`);
	} else if (commands.setPomoCountCommands.includes(command) && isMod) {
		setPomoCount(user, message);
	} else if (commands.addTimeCommands.includes(command) && isMod) {
		let time = processTime(message);

		if (time[0] <= 0) {
			return ComfyJS.Say(`@${user} Invalid input!`);
		}

		addTimeToTimer(time[0]);

		ComfyJS.Say(
			`@${user} Added ${time[1]} minutes ${time[2]} seconds to timer!`
		);
	} else if (commands.commandsResponses[command]) {
		ComfyJS.Say(commands[command].replace("{user}", user));
	} 
};




ComfyJS.Init(auth.username, `oauth:${auth.oauth}`, [auth.channel]);
