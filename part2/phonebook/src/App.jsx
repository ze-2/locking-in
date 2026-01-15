import { useState, useEffect } from 'react';
import axios from 'axios'
import personService from './services/persons';
import Notification from './components/Notification'


const Persons = ({ persons, deletePerson }) => {
  return persons.map((person) => (
      <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => deletePerson(person.name, person.id)}>delete</button>
      </div>
  ))
}

const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({newFilter, handleFilterChange}) => <div>filter shown with <input value={newFilter} onChange={handleFilterChange} /></div>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll('http://localhost:3001/persons')
      .then(persons => {
        setPersons(persons)
      })

  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const handleNotification = (type, message) => {
    setNotification({
      type: `${type}`,
      text: `${message}`
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(existingPerson.id, newPerson)
          .then(() => {
            const changedPerson = { ...existingPerson, number: newNumber }
            setPersons(persons.map(person => person.id === changedPerson.id ? changedPerson : person))
            setNewName('')
            setNewNumber('')
            handleNotification('success', `Updated ${newName}`)
          })
          .catch(e => {
            handleNotification('error', `${e}`)
          });
      }
    } else {
      personService.create(newPerson).then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
        handleNotification('success', `Created ${person.name}`)
      })
    }
  }

  const deletePerson = ( name, id ) => {
    if (confirm(`Delete ${name}?`)) {

      personService.del(id)
        .then(() => setPersons(persons.filter(n => n.id !== id)))
        .catch(() => handleNotification('error', `Information of ${name} was already removed from server`))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification}/>

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>

      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons deletePerson={deletePerson} persons={persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))} />

    </div>
  )
}

export default App