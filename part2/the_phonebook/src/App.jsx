import { useState, useEffect } from 'react'
import addService from './services/addService'

const	Notification = ({message, error}) =>
{
	if (message)
	{		
		return (
			<div className = 'message'>
				{message}
			</div>
		)
	}
	else if (error)
	{
		return (
			<div className = 'error'>
				{error}
			</div>
		)
	}
	return (null);
}

const	Form = ({add, name, nameHandle, number, numberHandle}) =>
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

const	Contact = ({name, number, filter, remove}) =>
{
	if (name.includes(filter))
	{
		return (
			<p>{name} {number} <button onClick = {remove}>delete</button> </p>
		)
	}
}

const	AddPerson = ({persons, filter, remove}) =>
{
	return (
		<div>
			{
				persons.map(person =>
				[
					<Contact 
						name = {person.name} 
						number = {person.number} 
						remove = {() => remove(person.id)} 
						filter = {filter} 
						key ={person.id}
					/>
				]
				)
			}
		</div>
	)
}

const	App = () => 
{
	const 	[persons, setPersons] = useState([]);
	const 	[newName, setNewName] = useState('');
	const	[newNumber, setNewNumber] = useState('');
	const 	[newFilter, setNewFilter] = useState('');
	const	[newMessage, setNewMessage] = useState('');
	const	[newError, setNewError] = useState('');

	const	loadData = async () =>
	{
		const	initialPersons = await addService.getAll();

		setPersons(initialPersons);
		console.log(persons);
	}
	
	useEffect(() =>
	{
		loadData();
	}, []);
		
	const	addName = (event) =>
	{
		event.preventDefault();
		const personObject =
		{
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		}
		if (personObject.name === '' || personObject.number === '')
		{
			alert(`No blanks allowed for name or number fields`);
		}
		else if (duplicateSearch(personObject.name, null) === 1 && duplicateSearch(null, personObject.number) !== 2)
		{
			updateNumber(personObject.name, personObject.number);
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
			addService
			.create(personObject)
			.then(returnedPerson =>
			{
				setPersons(persons.concat(returnedPerson));
				setNewMessage(`Added ${personObject.name}!`);
				setTimeout(() => {setNewMessage(null)}, 5000);
				setNewName('');
				setNewNumber('');
			}	
			)
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
	
	const	removePerson = (id) =>
	{
		const updatedPersons = persons.filter(person => person.id !== id);

		addService.deletePerson(id);
		setPersons(updatedPersons);
	}
	
	const	remove = (id) =>
	{
		const	name = persons.filter(person => person.id === id)[0].name;
		if (window.confirm(`Do you want to delete ${name} from phonebook?`))
			removePerson(id);
	}

	const	updateNumber = (name, number) =>
	{
		if (window.confirm(`Do you want to overwrite ${name}'s phone number?`))
		{ 
			const	targetPerson = persons.filter(person => (person.name === name))[0];
			const	targetId = (persons.filter(person => (person.name === name)))[0].id;
			
			targetPerson.number = number;
			const	updatedPersons = persons.map(person => person.name !== name ? person : targetPerson);
			
			addService
				.update(targetId, targetPerson)
				.then(response => 
				{
					setPersons(updatedPersons);
					setNewMessage(`${name}'s phone number was changed successfully!`);
					setTimeout(() => {setNewMessage(null)}, 5000);
					setNewName('');
					setNewNumber('');
				}
				)
				.catch(error =>
				{
					setNewError(`${name} was already deleted`);
					setTimeout(() => {setNewError(null)}, 5000);
					setPersons(persons.filter(person => person.name !== name));
				}
				)
		}
	}

  return (
    <div>
      <h2>Phonebook</h2>
	  <Notification message = {newMessage} error = {newError}/>
	  <Filter filter = {newFilter} filterHandle = {filterHandle} />
	  <h3>Add a new</h3>
	  <Form 
	  	add = {addName} 
		name = {newName} nameHandle = {nameHandle}
		number = {newNumber} numberHandle = {numberHandle} 
		/>
      <h2>Numbers</h2>
	  	<AddPerson persons = {persons} filter = {newFilter} remove = {remove}/>
    </div>
  )
}

export default App