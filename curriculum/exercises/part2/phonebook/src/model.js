import superagent from 'superagent';

export const Model = {
    persons: null,

    getPersons() {
        return superagent
            .get('https://3000.vscode.home.test:8080/persons')
            .then(function (response) {
                Model.persons = response.body;
                return Model.persons;
            });
    },

    addPerson(person) {
        const foundPerson = Model.persons.find(function (p) {
            return p.name === person.name;
        });
        if (foundPerson) {
            return Promise.reject(new Error(`${foundPerson.name} is already added to phonebook`));
        } else {
            return superagent
                .post('https://3000.vscode.home.test:8080/persons')
                .send(person)
                .then(function (response) {
                    const returnedPerson = response.body;
                    Model.persons.push(returnedPerson);
                    return returnedPerson;
                });
        }
    },
};
