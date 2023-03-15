console.clear()

gsap.set(".container", {xPercent: -50, yPercent: -50});

window.addEventListener("resize", () =>  gsap.set(".container", { scale: innerWidth >= 690 ? 1 : innerWidth / 690 }));

var spriteSheet = {
  width: 690,
  height: 690,
  total: 92,
  cols: 1,
  rows: 92,
  duration: 1
};

var tl = gsap.timeline({
  scrollTrigger: {
    scrub: 0.25
  }
});

for (var i = 0; i < spriteSheet.total; i++) {  
  tl.set(".frames", {
    x: (i % spriteSheet.cols) * -spriteSheet.width,
    y: Math.floor(i / spriteSheet.cols) * -spriteSheet.height
  }, i / (spriteSheet.total - 1) * spriteSheet.duration);
}

