import { Model } from './model';
import { View } from './view';

export const Controller = {
    init() {
        Model.persons.forEach(Controller.addPerson);
        View.registerOnFilterInput(Controller.filterPersons);
        View.registerOnSubmit(Controller.handleSubmit);
    },

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const newPerson = {
            name: formData.get('name'),
            number: formData.get('number'),
        };

        try {
            const returnedPerson = Model.addPerson(newPerson);
            Controller.addPerson(returnedPerson);
        } catch (exception) {
            alert(exception.message);
        }

        event.target.reset();
    },

    addPerson(person) {
        View.createPerson(person.name);
        const personText = person.name + ' ' + person.number;
        View.setPerson(person.name, personText);
        Controller.filterPersons();
    },

    filterPersons() {
        const filter = View.getFilterValue();

        View.filterPersons(function (personId) {
            const foundPerson = Model.persons.find(function (person) {
                return person.name /* name used as id */ === personId;
            });

            return foundPerson.name.toLowerCase().includes(filter.toLowerCase());
        });
    },
};
