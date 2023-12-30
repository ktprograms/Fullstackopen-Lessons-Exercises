const PersonForm = (onSubmit) => {
    const template = document.querySelector('template[data-component=PersonForm]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);

    /** @type {HTMLFormElement} */ const form = root.querySelector('.personform_form');
    form.addEventListener('submit', (event) => onSubmit(form, event));

    const render = () => {};
    render();
    return root;
};

export default PersonForm;
