export const View = {
    registerOnFilterInput(handler) {
        document.querySelector('input.filter').addEventListener('input', handler);
    },
    registerOnSubmit(handler) {
        document.querySelector('form.add').addEventListener('submit', handler);
    },

    setPerson(id, person) {
        document.querySelector(`.person[data-id="${id}"]`).textContent = person;
    },

    getFilterValue() {
        return document.querySelector('input.filter').value;
    },
    createPerson(id) {
        const person = document.createElement('div');
        person.classList.add('person');
        person.dataset.id = id;
        document.querySelector('.persons').appendChild(person);
    },
    filterPersons(filterFunction) {
        const personElements = document.querySelectorAll('.person');
        personElements.forEach(function (personElement) {
            const id = personElement.dataset.id;

            if (filterFunction(id)) {
                personElement.classList.remove('hidden');
            } else {
                personElement.classList.add('hidden');
            }
        });
    },
};
