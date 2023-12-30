const Person = (key, person) => {
    const template = document.querySelector('template[data-component=Person]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        root.dataset.key = key;
        root.textContent = `${person.name} ${person.number}`;
    };
    render();
    return root;
};

const App = () => {
    let persons = [
        {
            name: 'Arto Hellas',
            number: '040-1234567',
        },
    ];
    let filter = '';

    const template = document.querySelector('template[data-component=App]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);

    /** @type {HTMLInputElement} */ const input_filter = root.querySelector('.app_filter');
    input_filter.addEventListener('input', () => {
        filter = input_filter.value;
        render();
    });

    /** @type {HTMLFormElement} */ const form = root.querySelector('.app_form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name');
        const number = formData.get('number');

        if (persons.find((person) => person.name === name)) {
            alert(`${name} is already added to phonebook`);
        } else {
            persons.push({ name, number });
            render();
        }
        form.reset();
    });

    const render = () => {
        const personsToShow = filter
            ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
            : persons;
        root.querySelector('.app_persons').replaceChildren(
            ...personsToShow.map((person) => Person(person.name, person))
        );
    };
    render();
    return root;
};

export default App;
