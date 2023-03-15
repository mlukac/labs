console.clear();
gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({
  defaults: { duration: 1 }, 
  paused: true,
  scrollTrigger: { 
    trigger:".section",
    start: "center bottom",
    end: "center top",
    markers: true,
          
    scrub :true
    // ... 
  }
});
const startScrollTL = gsap.timeline({
  scrollTrigger: { 
    trigger:".section",
    markers: true,
          
     // ... 
  }
});
const TLDur2 = tl.duration();
console.log(TLDur2)
var total = tl.totalDuration(); 
console.log(total)
const canvas = document.getElementById("goldenhemp-canvas");
const context = canvas.getContext("2d");

canvas.width = 1158;
canvas.height = 770;

const frameCount = 147;
const currentFrame = index => (
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`
);

const images = []
const airpods = {
  frame: 0
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

let tween = gsap.to(airpods, {
  frame: frameCount - 1,
  snap: "frame",
  onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});
tl.add(tween)
images[0].onload = render;

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[airpods.frame], 0, 0); 
}

// Get the duration of the timeline to use for our positioning
const TLDur = tl.duration();
console.log(TLDur)
var myElems = document.querySelectorAll(".section div");
// Create the animations for each section 
myElems.forEach((elem, i) => {
  // Set things up
  const myStartTime = elem.dataset.startpercent/100 * TLDur;
  const myDur = (elem.dataset.endpercent - elem.dataset.startpercent)/100 * TLDur;
  console.log(myStartTime)
  console.log(myDur)

  // Get other parameters here

  gsap.set(elem, {
    position: 'fixed',
    // Other styles set here
  });

  // Animate the position and autoAlpha separately for more fine control
  startScrollTL.fromTo(elem, {
    autoAlpha: 1
  }, {
    autoAlpha: 0,
    duration: myDur,
    // I used a modified slow ease with yoyoMode: true to go in and out in one tween for this ease
    // https://greensock.com/docs/v3/Eases/SlowMo
    ease: "none"
  }, myStartTime)
  .to(elem, {
    // I only animated y here but you can do whatever
    y: () => `-${elem.dataset.endy - elem.dataset.starty}vh`,
    duration: myDur,
    ease: "none"
  }, myStartTime)
});