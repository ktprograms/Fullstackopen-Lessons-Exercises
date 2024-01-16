const Model = {
    persons: [
        { name: 'Arto Hellas' },
    ],
};

const View = {
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
        Model.persons.forEach(function (person) {
            View.createPerson(person.name);
            View.setPerson(person.name, person.name);
        });
    },
};

Controller.init();
