export const View = {
    registerOnFilterInput(handler) {
        document.querySelector('input.filter').addEventListener('input', handler);
    },
    registerOnSubmit(handler) {
        document.querySelector('form.add').addEventListener('submit', handler);
    },

    registerOnItemDeleteClick(handler) {
        document.querySelector('.persons').addEventListener('click', function (event) {
            if (event.target.matches('.person__remove')) {
                const personElement = event.target.closest('[data-id]');
                handler(personElement.dataset.id);
            }
        });
    },

    showMain() {
        document.querySelector('.loading').classList.add('hidden');
        document.querySelector('.main').classList.remove('hidden');
    },

    showNotification(message, isSuccess) {
        const notification = document.querySelector('.notification');
        notification.textContent = message;
        notification.classList.remove('hidden');

        if (isSuccess) {
            notification.classList.add('notification--success');
            notification.classList.remove('notification--error');
        } else {
            notification.classList.add('notification--error');
            notification.classList.remove('notification--success');
        }
    },
    hideNotification() {
        document.querySelector('.notification').classList.add('hidden');
    },

    setPerson(id, person) {
        document.querySelector(`.person[data-id="${id}"] > .person__info`).textContent = person;
    },
    removePerson(id) {
        const personElement = document.querySelector(`.person[data-id="${id}"]`);
        document.querySelector('.persons').removeChild(personElement);
    },

    getFilterValue() {
        return document.querySelector('input.filter').value;
    },
    createPerson(id) {
        const personElement = document
            .querySelector('template.template--person')
            .content.cloneNode(true)
            .firstElementChild;
        personElement.dataset.id = id;
        document.querySelector('.persons').appendChild(personElement);
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
