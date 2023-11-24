const Person = ({ person, onDeletePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => onDeletePerson(person)}>delete</button>
    </div>
  )
}

const Persons = ({ persons, onDeletePerson }) => {
  return (
    <>
      {persons.map((person) => <Person key={person.id} person={person} onDeletePerson={onDeletePerson} />)}
    </>
  )
}

export default Persons