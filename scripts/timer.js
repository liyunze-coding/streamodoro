const timer = document.querySelector("#timer");
const timerStatus = document.querySelector("#status");
const alarm = new Audio("./audio/ding.mp3");
const pomoCount = document.querySelector("#pomo-count");

// ADJUST VOLUME HERE
alarm.volume = 0.5;

let time;
let minutes, seconds, formattedTime;
let pause = false;
let reset = false;

let focusText = configs.states.focusState;
let breakText = configs.states.breakState;

let pomoStatus = focusText;

function processTime(str) {
	if (typeof str != "string") {
		return false; // we only process strings
	}
	let sec = 0;
	let min = 0;
	let time_seconds = 0;
	if (str.match(/(\d+)m/g)) {
		min = str.match(/(\d+)m/g)[0].slice(0, -1);
		time_seconds += parseInt(min) * 60;
	}
	if (str.match(/(\d+)s/g)) {
		sec = str.match(/(\d+)s/g)[0].slice(0, -1);
		time_seconds += parseInt(sec);
	}
	return [time_seconds, min, sec];
}

function updateStatus(str) {
	str = str.toLowerCase();
	if (str.includes("break") || str.includes(breakText.toLowerCase())) {
		pomoStatus = breakText;
		timerStatus.innerText = breakText;
	} else if (
		str.includes("focus") ||
		str.includes("work") ||
		str.includes(focusText.toLowerCase())
	) {
		// change pomo status and update timer status
		pomoStatus = focusText;
		timerStatus.innerText = focusText;
	} else {
		// when it's break, change to focus
		// when it's focus, change to break
		if (pomoStatus === breakText) {
			timerStatus.innerText = breakText;
		} else if (pomoStatus === focusText) {
			timerStatus.innerText = focusText;
		}
	}
}

function incrementPomoCount() {
	let pomoCount = document.getElementById("pomo-count").innerText;
	pomoCount = pomoCount.split("/");
	pomoCount[0] = parseInt(pomoCount[0]) + 1;
	pomoCount = pomoCount.join("/");
	document.getElementById("pomo-count").innerText = pomoCount;
}

function startTimer(time) {
	pause = false;
	reset = false;

	let interval = setInterval(function () {
		if (reset) {
			time = 0;
			reset = false;
			clearInterval(interval);
			timer.innerHTML = `00:00`;

			return;
		}
		if (pause) {
			return;
		}
		if (time < 0) {
			clearInterval(interval);
			alarm.play();
			if (pomoStatus === breakText) {
				updateStatus(focusText);
				incrementPomoCount();

				ComfyJS.Say(`Time to get back to work!`);
			} else if (pomoStatus === focusText) {
				updateStatus(breakText);
				ComfyJS.Say(`Time for a break!`);
			}
			return;
		}
		minutes = Math.floor(time / 60);
		seconds = time % 60;
		formattedTime = `${minutes < 10 ? "0" : ""}${minutes}:${
			seconds < 10 ? "0" : ""
		}${seconds}`;
		timer.innerHTML = formattedTime;
		time--;
	}, 1000);
}

function pauseTimer() {
	pause = true;
}

function resumeTimer() {
	pause = false;
}

function resetTimer() {
	reset = true;
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function test() {
	startTimer(60);
	console.log("started!");
	await sleep(5000);
	pauseTimer();
	console.log("paused!");
	await sleep(5000);
	resumeTimer();
	console.log("resumed!");
	await sleep(5000);
	resetTimer();
	console.log("reset!");
}

function loadGoogleFont(font) {
	WebFont.load({
		google: {
			families: [font],
		},
	});
}

function setPomoCount(user, message) {
	let count = parseInt(message);
	if (count) {
		// get pomoCount from HTML, split /, change latter to count
		let pomoCount = document.getElementById("pomo-count").innerText;
		pomoCount = pomoCount.split("/");
		pomoCount[1] = count;
		pomoCount = pomoCount.join("/");
		document.getElementById("pomo-count").innerText = pomoCount;

		ComfyJS.Say(`@${user} Pomodoro count set to ${count}!`);
	} else {
		ComfyJS.Say(`@${user} Invalid input!`);
	}
}

// convert taskListBorderColor to task-list-border-color
function convertToCSSVar(name) {
	let cssVar = name.replace(/([A-Z])/g, "-$1").toLowerCase();
	return `--${cssVar}`;
}

// hex to rgb that accepts 3 or 6 digits
function hexToRgb(hex) {
	// remove # if present
	if (hex[0] === "#") {
		hex = hex.slice(1);
	}

	let r = 0,
		g = 0,
		b = 0;

	if (hex.length == 3) {
		// 3 digits
		r = "0x" + hex[0] + hex[0];
		g = "0x" + hex[1] + hex[1];
		b = "0x" + hex[2] + hex[2];
	} else if (hex.length == 6) {
		// 6 digits
		r = "0x" + hex[0] + hex[1];
		g = "0x" + hex[2] + hex[3];
		b = "0x" + hex[4] + hex[5];
	}

	// interger value of rgb
	r = +r;
	g = +g;
	b = +b;

	return `${r}, ${g}, ${b}`;
}

(async function () {
	// load status
	document.getElementById("status").innerText = configs.states.focusState;

	// load fonts from configs.fonts which is an object
	for (let font in configs.fonts) {
		loadGoogleFont(configs.fonts[font]);
		console.log(font, configs.fonts[font]);
		document.documentElement.style.setProperty(
			convertToCSSVar(font),
			configs.fonts[font]
		);
	}

	// load styles from configs.styles
	for (let style in configs.styles) {
		document.documentElement.style.setProperty(
			convertToCSSVar(style),
			configs.styles[style]
		);
	}

	// load background styles
	document.documentElement.style.setProperty(
		"--background-color",
		`rgba(${hexToRgb(configs.backgroundStyles.backgroundColor)}, ${
			configs.backgroundStyles.backgroundOpacity
		})`
	);

	if (!configs.settings.showPomo) {
		document.querySelector("#pomo-count").style.display = "none";
	}
	if (!configs.settings.showStatus) {
		document.querySelector("#status").style.display = "none";
	}
})();
