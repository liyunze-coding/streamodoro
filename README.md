# DEPRECATED

Please use [Moh's pomodoro timer](https://github.com/mohamed-tayeh/Minimal-Pomo-Timer) instead. It's more professionally written and has more features in an organized manner.

# Streamodoro

A simple pomodoro timer overlay for streamers.

![Streamodoro preview](./images/timer.png)

## Features

- High customization ability (colours, font, font size, width, height, border etc.)
- Showing Focus / Break time (customizable)
- Connect to Twitch Chat with ease

## Setup

1. use https://twitchapps.com/tmi/ to generate an auth token
2. Open auth.js with Notepad, TextEdit (or other text editors you prefer)
3. Paste the oauth token `const oauth = "oauth:alksdgasdg987asdg";`
4. Remove the "oauth:" part `const oauth = "alksdgasdg987asdg";`

---

## Commands

1. `!timer [time] [focus/break]`

Example:

-    setting focus time to 50 minutes 10 seconds: `!timer 50m 10s focus`
-    setting break time to 10 minutes : `!timer 10m break`

2. `!setpomo [number of pomos]`

Example:

- `!setpomo 3`: Sets pomo counter to `?/3`

---
