import { useState } from 'react'

const Form = ({add, name, nameHandle, number, numberHandle}) =>
{
	return (
		<form onSubmit = {add}>
        <div>
          name: 
		  	<input 
		  		value = {name}
				onChange = {nameHandle}
			/>
        </div>
        <div>
          number: 
		  	<input 
		  		value = {number}
				onChange = {numberHandle}
			/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
	)
}

const	Filter = ({filter, filterHandle}) =>
{
	return (
		<div>
		filter:
	  		<input
	  			value = {filter}
				onChange = {filterHandle}
	  		/>
	  	</div>
	)
}

const	Contact = ({name, number, filter}) =>
{
	if (name.includes(filter))
	{
		return (
			<p>{name} {number}</p>
		)
	}
}

const AddPerson = ({persons, filter}) =>
{
	return (
			<div>
				{
					persons.map(person =>
					[
						<Contact name = {person.name} number = {person.number} filter = {filter} key ={person.id}/>
					]
					)
				}
			</div>
	)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]);
  const [newName, setNewName] = useState('');
  const	[newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState(''); 
 
  const	addName = (event) =>
  {
	event.preventDefault();
	const personObject =
	{
		name: newName,
		number: newNumber,
		id: (persons.length - 1) + 1,
	}
	if (personObject.name === '' || personObject.number === '')
	{
		alert(`No blanks allowed for name or number fields`);
	}
	else if (duplicateSearch(personObject.name, null) === 1)
	{
		alert(`${personObject.name} is already added to phonebook`);
	}
	else if (duplicateSearch(null, personObject.number) === 2)
	{
		alert(`The number ${personObject.number} is already added to phonebook`);
	}
	else
	{	
		setPersons(persons.concat(personObject));
		setNewName('');
		setNewNumber('');
	}
  }
  const	nameHandle = (event) =>
  {
	console.log(event.target.value);
	setNewName(event.target.value);
  }
  const	numberHandle = (event) =>
  {
	console.log(event.target.value);
	setNewNumber(event.target.value);
  }
  const	filterHandle = (event) =>
  {
	console.log(event.target.value);
	setNewFilter(event.target.value);
  }
  const	duplicateSearch = (name, number) =>
  {
	for (let i = 0; i < persons.length; i++)
	{
		if (persons[i].name === name)
				return (1);
	}
	for (let i = 0; i < persons.length; i++)
	{
		if (persons[i].number === number)
				return (2);
	}
	return (0);
  }
  
  persons[0].id = 0;
  console.log(persons[0].name.toLowerCase());

  return (
    <div>
      <h2>Phonebook</h2>
	  <Filter filter = {newFilter} filterHandle = {filterHandle} />
	  <h3>Add a new</h3>
	  <Form 
	  	add = {addName} 
		name = {newName} nameHandle = {nameHandle}
		number = {newNumber} numberHandle = {numberHandle} 
		/>
      <h2>Numbers</h2>
	  	<AddPerson persons = {persons} filter = {newFilter}/>
    </div>
  )
}

export default App