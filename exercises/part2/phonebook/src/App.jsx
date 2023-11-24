import { useEffect, useState } from 'react'
import notesService from './services/notes'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    notesService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    // This feels neater than making a whole new personObject and hoping it matches existing
    // Also, it's needed for getting the id
    const foundPerson = persons.find((person) => person.name === newName)
    if (foundPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...foundPerson, number: newNumber }

        notesService
          .update(foundPerson.id, changedPerson) // TODO: Possible TOCTTOU
          .then((returnedPerson) => {
            setPersons(persons.map((person) => person.id !== foundPerson.id ? person : returnedPerson))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      notesService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      notesService
        .remove(personToDelete.id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== personToDelete.id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter
    ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        onNewNameChange={handleNameChange}
        newNumber={newNumber}
        onNewNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDeletePerson={deletePerson} />
    </div>
  )
}

export default App