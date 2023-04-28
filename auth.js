const auth = (function () {
	// Authentication and channels - required
	const channel = "YOUR_CHANNEL_HERE"; // your channel
	const username = "YOUR_BOT_ACCOUNT_HERE"; // bot account
	const oauth = "OAUTH HERE"; // should be xxxxxxxxxxxx from the bot account, do NOT include the 'oauth:' part
	const discordWebHook = "https://discord.com/api/webhooks/1097176918740172881/P5gRliq5GmlUo5DH_zAZ2Ym_MJ-zk3tpeOb8gUjG-9GDR07jxs9BBCZaHFxgkXkzGziK";

	return {
		channel,
		username,
		oauth,
	};
})();
