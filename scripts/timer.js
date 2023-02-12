const timer = document.querySelector('#timer');
const alarm = new Audio('./audio/pins_mommy.mp3');
alarm.volume=0.2;
let time;
let minutes, seconds, formattedTime;
let pause = false;
let reset = false;
// const raid_shadow_legends = new Audio('./src/raid_alert.mp3');


function processTime(str) {
    if (typeof str != "string"){
        return false // we only process strings
    }
    let sec = 0;
    let min = 0;
    let time_seconds = 0;
    if (str.match(/(\d+)m/g)){
        min = str.match(/(\d+)m/g)[0].slice(0,-1);
        time_seconds += parseInt(min) * 60;
    }
    if (str.match(/(\d+)s/g)){
        sec = str.match(/(\d+)s/g)[0].slice(0,-1);
        time_seconds += parseInt(sec);
    }
    return [time_seconds, min, sec]
}

// ComfyJS.onRaid = (user, viewers, extra) => {
//     raid_shadow_legends.play();
//     ComfyJS.Say(`THANK YOU ${user} FOR THE RAID (${viewers} viewers)`);
// }

ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
    message = message.trim(); //trim message so no whitespaces

    if (['timer', 'settime'].includes(command)){
        if (!flags.broadcaster){
            return ComfyJS.Say(`@${user} only the streamer can use this command!`);
        }
        
        time = processTime(message)[0];
        let status;
        if (message.toLowerCase().includes('break')){
            status = 'Break';
            ComfyJS.Say(`/announce Time for a break!`);
        } else {
            status = 'Focus';
            ComfyJS.Say(`/announce Time to focus!`);
        }
        let countDown = setInterval(() => {
            if (time >= 0){
                minutes = parseInt(time/60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                seconds = (time%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
            
                formattedTime = `<span style='font-family:hubballi'>${status}</span><br>${minutes}:${seconds}`;
                timer.innerHTML = formattedTime;
            }

            if (time === 300){
                ComfyJS.Say(`5 more minutes left!`);
            }

            if (time === 60){
                ComfyJS.Say(`1 more minute left!`);
            }

            if (!pause){
                time--;
            }
            if (time < 0 && !reset){
                if (status === 'Break'){
                    ComfyJS.Say(`Break time's over!`);
                } else if (status === 'Focus'){
                    ComfyJS.Say(`Time for a break!`);
                }
                
                alarm.play();
                reset = false;
                clearInterval(countDown);
            }
            if (reset){
                reset = false;
                clearInterval(countDown);
            }
        }, 1000);

        return 
    } else if (command === 'reset'){
        if (!flags.broadcaster){
            return ComfyJS.Say(`@${user} only the streamer can use this command!`);
        }
        time = 0;
        reset = true;
        return ComfyJS.Say(`@${user} Timer reset!`);
    } else if (command === 'pause'){
        if (!flags.broadcaster){
            return ComfyJS.Say(`@${user} only the streamer can use this command!`);
        }
        pause = true;
        return ComfyJS.Say(`@${user} Paused timer!`);
    } else if (command === 'unpause'){
        if (!flags.broadcaster){
            return ComfyJS.Say(`@${user} only the streamer can use this command!`);
        }
        pause = false;
        return ComfyJS.Say(`@${user} Unpaused timer!`);
    }
}