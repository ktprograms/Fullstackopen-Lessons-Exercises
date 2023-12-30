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

const Persons = (persons, filter) => {
    const template = document.querySelector('template[data-component=Persons]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {
        const personsToShow = filter
            ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
            : persons;
        root.querySelector('.persons_s').replaceChildren(
            ...personsToShow.map((person) => Person(person.name, person))
        );
    };
    render();
    return root;
};

export default Persons;
