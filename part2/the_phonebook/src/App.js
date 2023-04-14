import { useState } from 'react'

const	Name = ({name}) =>
{
	return (
		<p>{name}</p>
	)
}

const Add = ({persons, duplicate}) =>
{
	console.log(duplicate);
	/*if (duplicate === 1)
	{
		return (
			<p>There are duplicates :/</p>
		)
	}*/
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
	if (duplicateSearch(personObject.name) === 1)
	{
		alert(`${personObject.name} is already added to phonebook`);
	}
	else
	{	
		setPersons(persons.concat(personObject));
		setNewName('');
	}
  }
  const	inputHandle = (event) =>
  {
	console.log(event.target.value);
	setNewName(event.target.value);
  }
  const	duplicateSearch = (find) =>
  {
	for (let i = 0; i < persons.length; i++)
	{
		if (persons[i].name === find)
				return (1);
	}
	return (0);
  }
  /*const	duplicateSearch = () =>
  {
	if (persons.length === 1)
		return (0);
	for (let i = 0; i < persons.length; i++)
	{
		for (let n = (i + 1); n < persons.length; n++)
		{
			if (persons[i].name === persons[n].name)
				return (1);
		}
	}
	return (0);
  }*/
  let	duplicate;
  
  persons[0].id = 0;
  duplicate = duplicateSearch();
  //console.log(persons[0].name);
  //console.log(isEqual(persons[0].name, persons[1].name))

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
	  	<Add persons = {persons} duplicate = {duplicate}/>
    </div>
  )
}

export default App