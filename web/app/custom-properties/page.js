window.addEventListener('scroll', () => {

    document.querySelector(":root").style.setProperty('--my-scroll-top', `${window.scrollY}`);
    document.querySelector(":root").style.setProperty('--myprop1', `${window.scrollY}deg`);
    document.querySelector(":root").style.setProperty('--myprop2', `${window.scrollY}px`);
    document.querySelector(":root").style.setProperty('--myprop3', `${window.scrollY}`);

});


document.querySelector(":root").style.setProperty('--my-window-width', `${window.innerWidth}`);
document.querySelector(":root").style.setProperty('--my-window-height', `${window.innerHeight}`);

window.addEventListener('resize', () => {

    document.querySelector(":root").style.setProperty('--my-window-width', `${window.innerWidth}`);
    document.querySelector(":root").style.setProperty('--my-window-height', `${window.innerHeight}`);

});

document.querySelector("#block-0").style.paddingTop = document.querySelector("#block-0 h1").clientWidth + "px";
