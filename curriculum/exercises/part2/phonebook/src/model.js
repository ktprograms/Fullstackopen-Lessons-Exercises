import superagent from 'superagent';

const baseUrl = 'https://3000.vscode.home.test:8080/persons';

export const Model = {
    persons: null,

    getPersons() {
        return superagent
            .get(baseUrl)
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
                .post(baseUrl)
                .send(person)
                .then(function (response) {
                    const returnedPerson = response.body;
                    Model.persons.push(returnedPerson);
                    return returnedPerson;
                });
        }
    },

    removePerson(id) {
        return superagent
            .delete(`${baseUrl}/${id}`)
            .then(function (response) {
                const removedId = response.body.id;
                Model.persons = Model.persons.filter(function (person) {
                    return person.id !== removedId;
                });
                return removedId;
            });
    },
};
