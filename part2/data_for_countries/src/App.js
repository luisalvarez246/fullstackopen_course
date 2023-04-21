import {useEffect, useState} from 'react'
import axios from 'axios'

const	Search = ({newSearch, newSearchHandle}) =>
{
	return (
		<div>
			find countries
			<input 
				value = {newSearch}
				onChange = {newSearchHandle} 
			/>
		</div>
	)
}

const	Countries = ({name, select}) =>
{	
	console.log(name);
	return (
		<p>{name} <button onClick = {select}>show</button></p>
	)
}

const	Languages = ({language}) =>
{
	return (
	<li>{language}</li>
	)
}

const	CountryDetails = ({name, capital, area, languages, flag}) =>
{
	const	lang = Object.entries(languages).map(language => language[1]);
	console.log(flag);
	return (
		<div>
			<h1>{name}</h1>
			<p>{capital}</p>
			<p>{area} km2</p>
			<h3>languages:</h3>
			{
				lang.map((l, i) =>
				[
					<Languages language = {l} key = {i}/>
				]
				)
			}
			<br></br>
			<img src = {flag} alt = 'country flag'/>
		</div>
	)
}

const	Results = ({results, select}) =>
{
	console.log(results);
	if (!results)
		return (null);
	else if (results.length > 10)
	{
		return (
			<div>
				<p>Too many matches, specify another filter</p>
			</div>
		)
	}
	else if (results.length === 1)
	{
		console.log(Object.entries(results[0].languages).map(language => language[1]));
		console.log(results[0].flags.png);
		return (
			<div>
				<CountryDetails 
					name = {results[0].name.common}
					capital = {results[0].capital[0]}
					area = {results[0].area}
					languages = {results[0].languages}
					flag = {results[0].flags.png}
				/>
			</div>
		)
	}
	const	filtered = results.map(country => country.name.common);
	return (
		<div>
		{
			filtered.map((result, i) =>
			[
				<Countries
					name = {result}
					key = {i}
					select = {() => select({result})}
				/>
			]	
			)
		}
		</div>
	)
}

function App() 
{
	const	[newSearch, setSearch] = useState('');
	const	[countries, setCountries] = useState('');

	const	newSearchHandle = (event) =>
	{
		console.log(event.target.value);
		setSearch(event.target.value);
	}
	
	const	hook = () =>
	{
		if (newSearch)
		{
			console.log('fetching countries...');
			axios
				.get(`https://restcountries.com/v3.1/all`)
				.then(response =>
				{
					const	allResults = response.data.filter(country => country.name.common
						.toLowerCase()
						.includes(newSearch.toLowerCase()) === true)
					//	.map(country => country.name.common);
					
					console.log(allResults);
					setCountries(allResults);
				}
				)
		}
		else
		{
			setCountries('');
		}
	}
	
	useEffect(hook, [newSearch]);

	const	select = (countryName) =>
	{
		console.log('is entering select');
		console.log(countryName.result);
		setSearch(countryName.result);
	}

	return (
		<>
			<Search newSearch = {newSearch} newSearchHandle = {newSearchHandle} />
			<Results results = {countries} select = {select}/>
		</>
	);
}

export default App;
