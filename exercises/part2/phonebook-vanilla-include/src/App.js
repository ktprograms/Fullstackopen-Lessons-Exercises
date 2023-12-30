const Person = (key, person) => {
    const template = document.querySelector('template[data-component=Person]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.dataset.key = key;
        root.textContent = person.name;
    };
    render();
    return root;
};

const App = () => {
    let persons = [
        {
            name: 'Arto Hellas',
        },
    ];

    const template = document.querySelector('template[data-component=App]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);

    /** @type {HTMLFormElement} */ const form = root.querySelector('.app_form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name');

        if (persons.find((person) => person.name === name)) {
            alert(`${name} is already added to phonebook`);
        } else {
            persons.push({ name });
            render();
        }
        form.reset();
    });

    const render = () => {
        root.querySelector('.app_persons').replaceChildren(
            ...persons.map((person) => Person(person.name, person))
        );
    };
    render();
    return root;
};

export default App;
