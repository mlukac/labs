console.clear();
    
const video = document.querySelector("#video");

if (video.readyState > 3) {
    init();
} else {
    video.addEventListener("canplaythrough", init);
}

function init() {
    video.removeEventListener("canplaythrough", init);

    var loader=document.getElementById('loader');
    var body=document.getElementsByTagName("body")[0];
    loader.classList.add("hide");

    video.currentTime=0.2;

    gsap.to(video, {
        currentTime: video.duration,
        scrollTrigger: {
            scrub:0.8
        }
    });
}