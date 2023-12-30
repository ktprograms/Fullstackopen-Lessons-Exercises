import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

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

    root.querySelector('.app_filter').replaceChildren(
        Filter((value) => {
            filter = value;
            render();
        })
    );

    root.querySelector('.app_personform').replaceChildren(
        PersonForm((form, event) => {
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
        })
    );

    const render = () => {
        root.querySelector('.app_persons').replaceChildren(
            Persons(persons, filter)
        );
    };
    render();
    return root;
};

export default App;
