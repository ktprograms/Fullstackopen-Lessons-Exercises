import { useEffect, useState } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [isSuccessMessage, setIsSuccessMessage] = useState(false) // default value doesn't matter

  useEffect(() => {
    personsService
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

        personsService
          .update(foundPerson.id, changedPerson) // TODO: Possible TOCTTOU
          .then((returnedPerson) => {
            setMessage(`Updated ${returnedPerson.name}`)
            setIsSuccessMessage(true)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.map((person) => person.id !== foundPerson.id ? person : returnedPerson))
          })
          .catch((error) => {
            if (error.response.status === 404) {
              setMessage(`Information of ${changedPerson.name} has already been removed from server`)
              setPersons(persons.filter((person) => person.id !== changedPerson.id))
            } else if (error.response.status === 400) {
              setMessage(error.response.data.error)
            }
            setIsSuccessMessage(false)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personsService
        .create(personObject)
        .then((returnedPerson) => {
          setMessage(`Added ${returnedPerson.name}`)
          setIsSuccessMessage(true)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.concat(returnedPerson))
        })
        .catch((error) => {
          setMessage(error.response.data.error)
          setIsSuccessMessage(false)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService
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
      <Notification message={message} isSuccess={isSuccessMessage} />
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