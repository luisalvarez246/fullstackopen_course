import { useState } from 'react'

const	Contact = ({name, number}) =>
{
	return (
		<p>{name} {number}</p>
	)
}

const Add = ({persons, duplicate}) =>
{
	console.log(duplicate);
	return (
			<div>
				{
					persons.map(person =>
					[
						<Contact name = {person.name} number = {person.number} key ={person.id}/>
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
  
  const	addName = (event) =>
  {
	event.preventDefault();
	const personObject =
	{
		name: newName,
		number: newNumber,
		id: (persons.length - 1) + 1
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
  let	duplicate;
  //let	test_array;
  
  persons[0].id = 0;
  duplicate = duplicateSearch();
  //test_array = persons.map(string => string.name);
  //console.log(test_array[1]);
  //console.log(isEqual(persons[0].name, persons[1].name))

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addName}>
      	<div>debug: {newNumber}</div>
        <div>
          name: 
		  	<input 
		  		value = {newName}
				onChange = {nameHandle}
			/>
        </div>
        <div>
          number: 
		  	<input 
		  		value = {newNumber}
				onChange = {numberHandle}
			/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
	  	<Add persons = {persons} duplicate = {duplicate}/>
    </div>
  )
}

export default App