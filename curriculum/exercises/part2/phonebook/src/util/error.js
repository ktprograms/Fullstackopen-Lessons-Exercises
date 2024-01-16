export class PersonExistsError extends Error {
    constructor(person) {
        super();
        this.person = person;
    }
}
