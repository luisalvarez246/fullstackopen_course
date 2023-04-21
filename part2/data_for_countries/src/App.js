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

const	Weather = ({temperature, wind, icon, capital}) =>
{
	if (temperature && wind && icon)
	{
		const	temp = Math.floor({...Object.entries(temperature)[0]}[1] - 273);
		const	speed = {...Object.entries(wind)[0]}[1];
		const	pic = (icon[1])[0].icon;
		const	url = `https://openweathermap.org/img/wn/${pic}@2x.png`

		console.log(temp);
		console.log(speed);
		console.log(pic)
		
		return (
			<>
				<h1>Weather in {capital}</h1>
				<p>temperature {temp} Celsius</p>
				<img src = {url} alt = 'weather icon' />
				<p>wind {speed} m/s</p>
			</>
		)
	}
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

const	Results = ({results, select, data}) =>
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
		console.log(results[0].latlng[1]);
		const	dataArray = Object.entries(data);
		console.log(dataArray);
		//const lat = results[0].latlng[0];
		//const long = results[0].latlng[1];
		return (
			<div>
				<CountryDetails 
					name = {results[0].name.common}
					capital = {results[0].capital[0]}
					area = {results[0].area}
					languages = {results[0].languages}
					flag = {results[0].flags.png}
				/>
				<Weather 
					temperature = {{...dataArray[3]}[1]}
					wind = {{...dataArray[5]}[1]}
					icon = {dataArray[1]}
					capital = {results[0].capital[0]}
					//key = {i}
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
	const	[data, setData] = useState('');

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
					setData('');
				}
				)
		}
		else
		{
			setCountries('');
			setData('');
		}
	}
	
	useEffect(hook, [newSearch]);

	// Voy a hacer testing del codigo de Weather aquí en select.
	const	select = (countryName) =>
	{
		console.log('is entering select');
		console.log(countryName.result);
		setSearch(countryName.result);
	}

	const	dataHook = () =>
	{
		if (countries.length === 1)
		{
			console.log('enters fetch')
			const lat = countries[0].latlng[0];
			const long = countries[0].latlng[1];
			const	api_key = process.env.REACT_APP_API_KEY;
			const	dataUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`;
		
			axios
				.get(dataUrl)
				.then(response =>
				{
					setData(response.data);
				}
				)
		}
	}
	useEffect(dataHook, [countries])
	/*if (data)
	{
		const	temperature = Math.floor(data.main.temp - 273);
		const	wind = data.wind.speed;
		const	icon_url = 'https://openweathermap.org/img/wn'
		const	icon = `${icon_url}/${data.weather[0].icon}@2x.png`
	}*/
	//console.log(countries[0].name.common)

	return (
		<>
			<Search newSearch = {newSearch} newSearchHandle = {newSearchHandle} />
			<Results results = {countries} select = {select} data = {data} />
		</>
	);
}

export default App;
