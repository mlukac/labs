gsap.registerPlugin(ScrollTrigger);
//ScrollTrigger.saveStyles(".move, .line, .fade-fromMarginRight, .fade-fromMarginLeft");

const rows = 15;
const columns = 10;
const missingImages = 3; // The number of missing images in the last row
const frame_count = rows * columns - missingImages  - 1;
const imageWidth = 11580;
const imageHeight = 11550;
const horizDiff = imageWidth / columns;
const vertDiff = imageHeight / rows;

gsap.set(".viewer-one", {width: horizDiff, height: vertDiff});

const setPos = gsap.quickSetter(".viewer-one", "background-position");

const obj = {num: 0};
gsap.to(obj, {
  num: frame_count,
  ease: "steps(" + frame_count + ")",
  scrollTrigger: {
    trigger: ".section-one",
    start: "top top",
    end: "+=" + imageHeight,
    pin: true,
    anticipatePin: 1,
    scrub: 1
  },
  onUpdate: () => setPos(`
    ${-Math.round((obj.num % columns) * horizDiff)}px
    ${-Math.round(Math.floor(obj.num / columns) * vertDiff)}px
  `)
});