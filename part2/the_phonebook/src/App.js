import { useState, useEffect } from 'react'
import addService from './services/addService'

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

const	Contact = ({name, number, filter, remove}) =>
{
	if (name.includes(filter))
	{
		return (
			<p>{name} {number} <button onClick = {remove}>delete</button> </p>
		)
	}
}

const AddPerson = ({persons, filter, remove}) =>
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


const App = () => {
	const 	[persons, setPersons] = useState([]);
	const 	[newName, setNewName] = useState('');
	const	[newNumber, setNewNumber] = useState('');
	const 	[newFilter, setNewFilter] = useState(''); 
	
	const	effectHook = () =>
	{
		addService
		.getAll()
		.then(initialPersons =>
		{
			setPersons(initialPersons);
		}
		)
	}
	
	useEffect(effectHook, []);
		
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

	const	idUpdate = (updatedPersons, last) =>
	{
		let	changedId;

		changedId = last;
		for (let i = 1; i <= updatedPersons.length; i++)
		{
			if (i !== updatedPersons[i - 1].id)
			{
				updatedPersons[i - 1].id = i;
				changedId = i;
			}
			console.log(updatedPersons[i - 1].name, updatedPersons[i - 1].id);
		}
		return (changedId);
	}

	const	addNext = (updatedPersons, id) =>
	{
		for (let i = id; i > 0; i--)
		{
			addService
				.update(i, updatedPersons[i - 1])
				.then(response => {console.log('put first half')});
		}
		for (let i = id; i < updatedPersons.length; i++)
		{
			addService
				.update(i + 1, updatedPersons[i])
				.then(response => {console.log('put second half')});
		}
	}
	/**
	 * 
	 * @updatedPersons is a copy of the array persons, filtering out the element to be deleted.
	 * @changeID returns the ID of the element to be deleted.
	 *  @Conditional if the element to be deleted is the last element on the array, no id reassignation is 
	 * 				carried.
	 * 				else the addNext function is called. It uses put requests to update each element on the 
	 * 				server but the last with the updatedPersons array.
	 * 				Then the last element, that will be duplicated, is deleted.
	 * Lastly setPersons() is called with updatedPersons in order to refresh the view.
	 */
	const	removePerson = (id) =>
	{
		let	changedId;
		const updatedPersons = persons.filter(person => person.id !== id);

		changedId = idUpdate(updatedPersons, persons.length);
		if (changedId === persons.length)
		{
			addService
				.deletePerson(id)
				.then(response => {console.log('deleted last, no reorder needed')});
		}
		else
		{
			addNext(updatedPersons, id);
			addService
				.deletePerson(persons.length)
				.then(response => {console.log('deleted, item, list reordered')});
		}
			setPersons(updatedPersons);
			console.log(updatedPersons);
			console.log(changedId);		
	}
	
	const	remove = (id) =>
	{
		if (window.confirm(`Do you want to delete ${persons[id - 1].name} from phonebook?`))
			removePerson(id);
	}

	const	updateNumber = (name, number) =>
	{
		if (window.confirm(`Do you want to overwrite ${name}'s phone number?`))
		{ 
			const	targetPerson = persons.filter(person => (person.name === name));
			const	targetId = (persons.filter(person => (person.name === name)))[0].id;
			
			targetPerson[0].number = number;
			const	updatedNumber = persons.map(person => person.name !== name ? person : targetPerson[0]);
			
			addService
				.update(targetId, updatedNumber[targetId - 1]);
			setPersons(updatedNumber);
		}
	}

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
	  	<AddPerson persons = {persons} filter = {newFilter} remove = {remove}/>
    </div>
  )
}

export default App