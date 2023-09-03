let configs = (function () {
	// discord webhook for break time
	const discordNotif = true;
	const discordWebHookMessage =
		"<@&1052576825504698388> https://twitch.tv/RyanPython\n\nbreak time\n\n*sent from ryans\\_bot\\_*";

	// statuses
	const focusState = "Focus";
	const breakState = "Break";

	// settings
	const showStatus = true;
	const showPomo = true;

	// overall
	const timerWidth = "130px";
	const timerHeight = "60px";

	const backgroundColor = "#141414";
	const backgroundOpacity = 0;

	const padding = "10px";

	const borderWidth = "0px";
	const borderColor = "#ffffff";
	const borderRadius = "10px";

	// fonts, must be google font : fonts.google.com
	const timerFont = "Courier Prime";
	const statusFont = "Nunito";
	const pomoFont = "Nunito";

	// status
	const statusFontColor = "#ffffff";
	const statusFontSize = "25px";
	const statusFontWeight = "bold";
	const statusMarginLeft = "0px";
	const statusMarginRight = "0px";

	// pomo
	const pomoFontColor = "#ffffff";
	const pomoFontSize = "25px";
	const pomoFontWeight = "bold";
	const pomoMarginLeft = "0px";
	const pomoMarginRight = "0px";

	// status pomo container
	const statusPomoWidth = "90%";

	// timer
	const timerFontColor = "#ffffff";
	const timerFontSize = "35px";
	const timerFontWeight = "normal";
	const timerTextAlign = "center";

	// commands - MUST BE ALL LOWER CASE
	const startTimerCommands = [
		"!start",
		"!begin",
		"!timer",
		"!starttimer",
		"!begintimer",
	];

	const pauseTimerCommands = ["!pause", "!stop", "!stoptimer", "!pausetimer"];

	const resetTimerCommands = [
		"!reset",
		"!restart",
		"!restarttimer",
		"!resettimer",
	];

	const resumeTimerCommands = [
		"!unpause",
		"!resume",
		"!continue",
		"!unpausetimer",
		"!resumetimer",
		"!continuetimer",
	];

	const setPomoCountCommands = [
		"!setpomocount",
		"!setpomo",
		"!setpomos",
		"!setpomoscount",
		"!setpomosnumber",
	];

	const addTimeCommands = ["!addtime", "!timeradd", "!addtimer", "!timeadd"];

	const endTimerEarlyCommands = [
		"!endtimer",
		"!end",
		"!endearly",
		"!endtimerearly",
	];

	const commandsResponses = {
		timerhelp:
			"{user} check the commands of the timer here! https://github.com/liyunze-coding/streamodoro#usage",
	};

	// const durations = {
	// 	workTimeDuration,
	// 	breakTimeDuration,
	// };

	// const automatic = {
	// 	automaticStart,
	// 	automaticStartDelay,
	// };

	const states = {
		focusState,
		breakState,
	};

	const settings = {
		showStatus,
		showPomo,
	};

	const fonts = {
		timerFont,
		statusFont,
		pomoFont,
	};

	const backgroundStyles = {
		backgroundColor,
		backgroundOpacity,
	};

	const styles = {
		timerWidth,
		timerHeight,
		statusFontColor,
		timerFontColor,
		statusFontSize,
		timerFontSize,
		statusFontWeight,
		timerFontWeight,
		pomoFontColor,
		pomoFontSize,
		pomoFontWeight,
		statusPomoWidth,
		padding,
		borderWidth,
		borderColor,
		borderRadius,
		statusMarginLeft,
		statusMarginRight,
		pomoMarginLeft,
		pomoMarginRight,
		timerTextAlign,
	};

	const customCommands = {
		startTimerCommands,
		pauseTimerCommands,
		resetTimerCommands,
		resumeTimerCommands,
		setPomoCountCommands,
		addTimeCommands,
		endTimerEarlyCommands,
		commandsResponses,
	};

	const discord = {
		discordNotif,
		discordWebHookMessage,
	};

	return {
		states,
		settings,
		fonts,
		styles,
		backgroundStyles,
		customCommands,
		discord,
	};
})();
