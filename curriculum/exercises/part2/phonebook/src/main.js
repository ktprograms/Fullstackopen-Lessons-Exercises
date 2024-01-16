const Model = {
    persons: [
        { name: 'Arto Hellas' },
    ],

    addPerson(person) {
        Model.persons.push(person);
        return person;
    },
};

const View = {
    registerOnSubmit(handler) {
        document.querySelector('form.add').addEventListener('submit', handler);
    },

    setPerson(id, person) {
        document.querySelector(`.person[data-id="${id}"]`).textContent = person;
    },

    createPerson(id) {
        const person = document.createElement('div');
        person.classList.add('person');
        person.dataset.id = id;
        document.querySelector('.persons').appendChild(person);
    },
};

const Controller = {
    init() {
        Model.persons.forEach(Controller.addPerson);
        View.registerOnSubmit(Controller.handleSubmit);
    },

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const newPerson = {
            name: formData.get('name'),
        };

        const returnedPerson = Model.addPerson(newPerson);
        Controller.addPerson(returnedPerson);
    },

    addPerson(person) {
        View.createPerson(person.name);
        View.setPerson(person.name, person.name);
    },
};

Controller.init();
