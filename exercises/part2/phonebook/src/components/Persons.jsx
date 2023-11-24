const Person = ({ person, onDelete }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={onDelete}>delete</button>
    </div>
  )
}

const Persons = ({ persons, makeOnDelete }) => {
  return (
    <>
      {persons.map((person) => <Person key={person.id} person={person} onDelete={makeOnDelete(person)} />)}
    </>
  )
}

export default Persons