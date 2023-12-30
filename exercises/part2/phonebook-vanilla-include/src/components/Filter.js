const Filter = (onChange) => {
    const template = document.querySelector('template[data-component=Filter]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);

    /** @type {HTMLInputElement} */ const input = root.querySelector('.filter_input');
    input.addEventListener('input', () => onChange(input.value));

    const render = () => {};
    render();
    return root;
};

export default Filter;
