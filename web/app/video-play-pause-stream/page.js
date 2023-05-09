// Loop through each iframe and set up the player for each one
document.querySelectorAll('.vpps-player').forEach((iframe) => {
    const landscapeSrc = iframe.getAttribute('data-landscape');
    const portraitSrc = iframe.getAttribute('data-portrait');
    const player = Stream(iframe);

    // Create an observer that will trigger when the player is in view
    const observer = new IntersectionObserver(
        (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Player is in view, so play the video
                player.play().catch((error) => {
                    console.log(`playback failed: ${error}`);
                    player.muted = true;
                    player.play();
                });
            } else {
                // Player is out of view, so pause the video
                player.pause();
            }
        });
        },
        { threshold: 0.5 }
    );

    // LANDSCAPE ONLY MODE --------------------------------------------------------------------------------------
    // If portrait source not available only use landscape source
    if (landscapeSrc != null && portraitSrc == null) {
        iframe.parentNode.classList.add('vpps-landscape');
        iframe.src = landscapeSrc;

        // Add the iframe element to the observer
        observer.observe(iframe);
        // Listen for when the video finishes playing
        player.addEventListener('ended', () => {
        // Remove the iframe element from the observer to stop it from playing again
        observer.unobserve(iframe);
        });
    }

    // PORTRAIT ONLY MODE --------------------------------------------------------------------------------------
    // If landscape source not available only use portrait source
    else if (portraitSrc != null && landscapeSrc == null) {
        iframe.parentNode.classList.add('vpps-portrait');
        iframe.src = portraitSrc;

        function handlePlaying() {
            if (mediaQueryWidth.matches) {
                iframe.parentNode
                .querySelector('.on-hover')
                .replaceWith(iframe.parentNode.querySelector('.on-hover').cloneNode(true));

                // Add the iframe element to the observer
                observer.observe(iframe);
            } else {
                player.pause();
                observer.unobserve(iframe);
                iframe.parentNode.querySelector('.on-hover').addEventListener('mouseover', () => {
                    player.play();
                });
                iframe.parentNode.querySelector('.on-hover').addEventListener('mouseout', () => {
                    player.pause();
                });
            }
        }

        // Detect screen width changes
        const mediaQueryWidth = window.matchMedia('(max-width: 1200px)');
        mediaQueryWidth.addListener(() => {
            // Update the iframe class and src attributes based on the screen width
            handlePlaying();
        });
        handlePlaying();
        // Set the initial iframe class and src attributes based on the screen width
    }

    // PORTRAIT AND LANSCAPE MODE --------------------------------------------------------------------------------------
    // Else use portrait and landscape sources
    else {
        // Detect screen orientation changes
        const mediaQuery = window.matchMedia('(orientation: portrait)');
        mediaQuery.addListener(() => {
        // Update the iframe class and src attributes based on the screen orientation
        if (mediaQuery.matches) {
            iframe.parentNode.classList.remove('vpps-landscape');
            iframe.parentNode.classList.add('vpps-portrait');
            iframe.src = portraitSrc;
        } else {
            iframe.parentNode.classList.remove('vpps-portrait');
            iframe.parentNode.classList.add('vpps-landscape');
            iframe.src = landscapeSrc;
        }
        });

        // Set the initial iframe class and src attributes based on the screen orientation
        if (mediaQuery.matches) {
            iframe.parentNode.classList.add('vpps-portrait');
            iframe.src = portraitSrc;
        } else {
            iframe.parentNode.classList.add('vpps-landscape');
            iframe.src = landscapeSrc;
        }

        // Add the iframe element to the observer
        observer.observe(iframe);
        // Listen for when the video finishes playing
        player.addEventListener('ended', () => {
        // Remove the iframe element from the observer to stop it from playing again
        observer.unobserve(iframe);
        });
    }
});


// function loadVideo(video) {
//     var sources = video.querySelectorAll('source');
//     var isLoaded = video.hasAttribute('data-loaded');

//     if (!isLoaded) {
//         var orientation = getScreenOrientation();
//         var selectedSource = null;

//         sources.forEach(function(source) {
//             var src1 = source.getAttribute('data-src-portrait');
//             var src2 = source.getAttribute('data-src-landscape');
//             var type = source.getAttribute('type');

//             if (src1 && src2 && type) {
//                 if (orientation === 'landscape' && type.indexOf('mp4') > -1) {
//                     selectedSource = src2;
//                 } else if (orientation === 'portrait' && type.indexOf('mp4') > -1) {
//                     selectedSource = src1;
//                 }
//             }
//         });

//         if (selectedSource) {
//             sources.forEach(function(source) {
//                 source.removeAttribute('src');
//                 source.setAttribute('src', selectedSource);
//             });

//             video.load();
//             video.setAttribute('data-loaded', 'true');
//         }
//     }
// }

// function playVideo(video) {
//     if (video.readyState >= 2) {
//         video.play();
//     } else {
//         video.addEventListener('canplay', function() {
//             var promise = video.play();
//             if (promise !== undefined) {
//                 promise.catch(error => {
//                     console.log("Play prevented, click to play");
//                     // Show a UI element to let the user manually start playback
//                 }).then(() => {
//                     console.log("Play started");
//                 });
//             }
//         });
//     }
// }

// function pauseVideo(video) {
//     video.pause();
// }

// function getScreenOrientation() {
//     var orientation = 'portrait';
//     if (window.matchMedia('(orientation: landscape)').matches) {
//         orientation = 'landscape';
//     }
//     return orientation;
// }

// let currentVideo = null;
// function handleIntersection(entries, observer) {
//     entries.forEach(function(entry) {
//         if (entry.isIntersecting) {
//             var video = entry.target;
//             var source = video.querySelector('source');
//             var isLoaded = video.hasAttribute('data-loaded');
//             if (!isLoaded) {
//                 loadVideo(video, source);
//                 video.setAttribute('data-loaded', 'true');
//             }
//             if (currentVideo && currentVideo !== video) {
//                 pauseVideo(currentVideo);
//             }
//             currentVideo = video;

//             video.style.visibility = 'visible';
//             playVideo(video);
//         } else {
//             pauseVideo(entry.target);
//         }
//     });
// }

// var options = {
//     // root: null,
//     rootMargin: '0px',
//     threshold: 0.5
// };
// var observer = new IntersectionObserver(handleIntersection, options);

// var videos = document.querySelectorAll('video');
// videos.forEach(function(video) {
//     observer.observe(video);
// });

// window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
//     var videos = document.querySelectorAll('video');
//     var sources = document.querySelectorAll('source');
//     videos.forEach(function(video) {
//         video.removeAttribute('data-loaded');
//         video.style.visibility = 'hidden';
//         observer.observe(video);
//     });
// });

// window.openFullscreen = function(thiss) {
//     var elem = thiss.previousElementSibling;
//     if (elem.requestFullscreen) {
//         elem.requestFullscreen();
//     } else if (elem.webkitRequestFullscreen) { /* Safari */
//         elem.webkitRequestFullscreen();
//     }
// }