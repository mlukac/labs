const formControls = document.querySelectorAll('.form-control');
formControls.forEach(formControl => {
    formControl.addEventListener('input', () => {
        const parent = formControl.parentElement;
        if (formControl.value !== '') {
            parent.classList.add('has-value');
        } else {
            parent.classList.remove('has-value');
        }
    });
});