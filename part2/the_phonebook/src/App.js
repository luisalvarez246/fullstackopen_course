import { useState } from 'react'

const	Name = ({name}) =>
{
	return (
		<p>{name}</p>
	)
}

const Add = ({persons}) =>
{
	return (
			<div>
				{
					persons.map(person =>
					[
						<Name name = {person.name} key ={person.id}/>
					]
					)
				}
			</div>
	)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const	addName = (event) =>
  {
	event.preventDefault();
	const personObject = 
	{
		name: newName,
		id: (persons.length - 1) + 1
	}
	setPersons(persons.concat(personObject));
	setNewName('');
  }
  const	inputHandle = (event) =>
  {
	console.log(event.target.value);
	setNewName(event.target.value);
  }
  
  persons[0].id = 0;

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addName}>
      	<div>debug: {newName}</div>
        <div>
          name: 
		  	<input 
		  		value = {newName}
				onChange = {inputHandle}
			/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
	  	<Add persons = {persons} />
    </div>
  )
}

export default App