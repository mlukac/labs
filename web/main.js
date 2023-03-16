document.querySelector("#sidebar").addEventListener('scroll', () => {
    document.querySelector(":root").style.setProperty('--sidebarScrollTop', `${document.querySelector("#sidebar").scrollTop / 2}deg`);
});
