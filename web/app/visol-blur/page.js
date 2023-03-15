console.clear();
gsap.registerPlugin(ScrollTrigger);
gsap.set(".blur1", { filter: "blur(100px)" });
gsap.to(".blur1", {
  filter: "blur(0px)",
  scrollTrigger: {
    trigger: ".blur1",
    start: "top center",
    end: "top top",
    scrub: true,
    // markers: true
  }
});

// const scrolling = {
//     enabled: true,
//     events: "scroll,wheel,touchmove,pointermove".split(","),
//     prevent: e => e.preventDefault(),
//     disable() {
//       if (scrolling.enabled) {
//         scrolling.enabled = false;
//         window.addEventListener("scroll", gsap.ticker.tick, {passive: true});
//         scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, {passive: false}));
//       }
//     },
//     enable() {
//       if (!scrolling.enabled) {
//         scrolling.enabled = true;
//         window.removeEventListener("scroll", gsap.ticker.tick);
//         scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
//       }
//     }
//   };

// const blurTrigger = {
//     name: "blur",
//     get(target) {
//       return +(getBlurMatch(target)[1]) || 0;
//     },
//     init(target, endValue) {
//       let data = this,
//           filter = gsap.getProperty(target, blurProperty),
//           endBlur = "blur(" + endValue + "px)",
//           match = getBlurMatch(target)[0],
//           index;
//       if (filter === "none") {
//         filter = "";
//       }
//       if (match) {
//         index = filter.indexOf(match);
//         endValue = filter.substr(0, index) + endBlur + filter.substr(index + match.length);
//       } else {
//         endValue = filter + endBlur;
//         filter += filter ? " blur(0px)" : "blur(0px)";
//       }
//       data.target = target;
//       data.interp = gsap.utils.interpolate(filter, endValue);
//     },
//     render(progress, data) {
//       data.target.style[blurProperty] = data.interp(progress);
//     }
//   }


//   ScrollTrigger.defaults({
//     toggleActions: "play pause resume reverse",
//     scroller: ".container"
//   });

//   gsap.fromTo(".blur1",
//     {
//     blur: 30,
//       filter: 'blur(30px)',
//       webkitFilter: 'blur(30px)',
//       yoyo: true,
//     },
//     {
//     blur: 0,
//       filter: 'blur(0px)',
//       webkitFilter: 'blur(0px)',
//       yoyo: true,
//       scrollTrigger: {trigger:".section2",start:200},
//       duration: 100,
//     },
//   )
