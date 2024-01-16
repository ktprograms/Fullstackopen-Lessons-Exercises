export const Model = {
    persons: [
        { name: 'Arto Hellas', number: '040-1234567' },
    ],

    addPerson(person) {
        const foundPerson = Model.persons.find(function (p) {
            return p.name === person.name;
        });
        if (foundPerson) {
            throw new Error(`${foundPerson.name} is already added to phonebook`);
        } else {
            Model.persons.push(person);
            return person;
        }
    },
};
