const video = document.getElementById('video');
const subtitle = document.getElementById('lyrics');
const subtitleUrl = 'lyrics.srt';

let subtitleData = [];

// Load the subtitle file and parse the subtitle data
const xhr = new XMLHttpRequest();
xhr.open('GET', subtitleUrl, true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let subtitleText = xhr.responseText;
        const subtitleBlocks = subtitleText.split('\n\n');

        for (let i = 0; i < subtitleBlocks.length; i++) {
            const subtitleLines = subtitleBlocks[i].split('\n');
            const subtitleTiming = subtitleLines[1].split(' --> ');
            subtitleText = subtitleLines.slice(2).join('\n');
            subtitleData.push({
                startTime: timeToSeconds(subtitleTiming[0]),
                endTime: timeToSeconds(subtitleTiming[1]),
                text: subtitleText
            });
        }

        // Set up the "timeupdate" event listener on the video element
        video.addEventListener('timeupdate', function() {
            const currentTime = video.currentTime; 

            // Check if the current time falls within a subtitle block's time range
            for (let i = 0; i < subtitleData.length; i++) {  
                if (currentTime >= subtitleData[i].startTime && currentTime <= subtitleData[i].endTime) {
                    subtitle.innerText = subtitleData[i].text;
                    subtitle.classList.add("active");
                    return;
                }
            }
            // If the current time is not within any subtitle block's time range, hide the subtitle text
            subtitle.innerText = '';
            subtitle.classList.remove("active");
        });
    }
};
xhr.send();

// Helper function to convert a time string in the format of "00:00:00,000" to seconds
function timeToSeconds(timeString) {
    const parts = timeString.split(':');
    const seconds = parseFloat(parts[2].replace(',', '.'));
    const minutes = parseInt(parts[1]);
    const hours = parseInt(parts[0]);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
}
