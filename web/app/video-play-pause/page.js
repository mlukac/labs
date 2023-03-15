function loadVideo(video) {
    var sources = video.querySelectorAll('source');
    var isLoaded = video.hasAttribute('data-loaded');

    if (!isLoaded) {
        var orientation = getScreenOrientation();
        var selectedSource = null;

        sources.forEach(function(source) {
            var src1 = source.getAttribute('data-src-portrait');
            var src2 = source.getAttribute('data-src-landscape');
            var type = source.getAttribute('type');

            if (src1 && src2 && type) {
                if (orientation === 'landscape' && type.indexOf('mp4') > -1) {
                    selectedSource = src2;
                } else if (orientation === 'portrait' && type.indexOf('mp4') > -1) {
                    selectedSource = src1;
                }
            }
        });

        if (selectedSource) {
            sources.forEach(function(source) {
                source.removeAttribute('src');
                source.setAttribute('src', selectedSource);
            });

            video.load();
            video.setAttribute('data-loaded', 'true');
        }
    }
}

function playVideo(video) {
    if (video.readyState >= 2) {
        video.play();
    } else {
        video.addEventListener('canplay', function() {
            var promise = video.play();
            if (promise !== undefined) {
                promise.catch(error => {
                    console.log("Play prevented, click to play");
                    // Show a UI element to let the user manually start playback
                }).then(() => {
                    console.log("Play started");
                });
            }
        });
    }
}

function pauseVideo(video) {
    video.pause();
}

function getScreenOrientation() {
    var orientation = 'portrait';
    if (window.matchMedia('(orientation: landscape)').matches) {
        orientation = 'landscape';
    }
    return orientation;
}

let currentVideo = null;
function handleIntersection(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var video = entry.target;
            var source = video.querySelector('source');
            var isLoaded = video.hasAttribute('data-loaded');
            if (!isLoaded) {
                loadVideo(video, source);
                video.setAttribute('data-loaded', 'true');
            }
            if (currentVideo && currentVideo !== video) {
                pauseVideo(currentVideo);
            }
            currentVideo = video;

            video.style.visibility = 'visible';
            playVideo(video);
        } else {
            pauseVideo(entry.target);
        }
    });
}

var options = {
    // root: null,
    rootMargin: '0px',
    threshold: 0.5
};
var observer = new IntersectionObserver(handleIntersection, options);

var videos = document.querySelectorAll('video');
videos.forEach(function(video) {
    observer.observe(video);
});

window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
    var videos = document.querySelectorAll('video');
    var sources = document.querySelectorAll('source');
    videos.forEach(function(video) {
        video.removeAttribute('data-loaded');
        video.style.visibility = 'hidden';
        observer.observe(video);
    });
});

window.openFullscreen = function(thiss) {
    var elem = thiss.previousElementSibling;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    }
}