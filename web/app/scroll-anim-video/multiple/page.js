gsap.registerPlugin(ScrollTrigger);
/* The encoding is super important here to enable frame-by-frame scrubbing. */
// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4
// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output_960.mp4

gsap.utils.toArray(".video-scrub").forEach(video => videoScrub(video, {
  scrollTrigger: {
    trigger: video,
    start: "center center",
    end: "+=600",
    // markers: true,
    scrub: true,
    pin: true
  }
}));

function videoScrub(video, vars) {
  video = gsap.utils.toArray(video)[0]; // in case selector text is fed in.
  let once = (el, event, fn) => {
        let onceFn = function () {
          el.removeEventListener(event, onceFn);
          fn.apply(this, arguments);
        };
        el.addEventListener(event, onceFn);
        return onceFn;
      },
      prepFunc = () => { video.play(); video.pause(); },
      prep = () => once(document.documentElement, "touchstart", prepFunc),
      src = video.currentSrc || video.src,
      tween = gsap.fromTo(video, {currentTime: 0}, {paused: true, immediateRender: false, currentTime: video.duration || 1, ease: "none", ...vars}),
      resetTime = () => (tween.vars.currentTime = video.duration || 1) && tween.invalidate();
  prep();
  video.readyState ? resetTime() : once(video, "loadedmetadata", resetTime);
  return tween;
}