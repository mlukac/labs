gsap.registerPlugin(ScrollTrigger);

const rows = 20;
const columns = 9;
const missingImages = 2; // The number of missing images in the last column
const frame_count = rows * columns - missingImages - 1;

const imageWidth = 6500; // This is an approximate value
const imageHeight = 8140; // This is an approximate value
const horizDiff = imageWidth / columns;
const vertDiff = imageHeight / rows;

gsap.set(".viewer", {width: horizDiff, height: vertDiff});

const setPos = gsap.quickSetter(".viewer", "background-position");

const obj = {num: 0};
gsap.to(obj, {
  num: frame_count,
  ease: "steps(" + frame_count + ")",
  scrollTrigger: {
    trigger: ".scene",
    start: "top top",
    end: "+=" + imageHeight,
    pin: true,
    anticipatePin: 1,
    scrub: true
  },
  onUpdate: () => setPos(`
    ${-Math.round(Math.floor(obj.num / rows) * horizDiff)}px 
    ${-Math.round((obj.num % rows) * vertDiff)}px
  `)
});