(function() {
    const wrapper = document.querySelector('.tabs');
    const label = document.querySelector('label');

    document.querySelectorAll("label").forEach(label => {
        label.addEventListener('click', tabsTopScroll);
    });

    function tabsTopScroll(e) {
        const wrapperPosition = wrapper.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: wrapperPosition, behavior: 'smooth' });
    }

})();