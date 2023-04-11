/*const	Part = (props) =>
{
	console.log(props);
	return (
		<div>
			<p>{props.name} {props.exercises}</p>
		</div>
	)
}

const	Content = (props) =>
{
	console.log(props);
	return (
		<div>
			<Part name = {props.parts[0].name} exercises = {props.parts[0].exercises}/>
			<Part name = {props.parts[1].name} exercises = {props.parts[1].exercises}/>
			<Part name = {props.parts[2].name} exercises = {props.parts[2].exercises}/>
		</div>
	)
}

const	Total = (props) =>
{
	console.log(props);
	return (
		<div>
			<p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
		</div>
	)
}

const	App = () =>
{
	const course =
	{
		name: "Half Stack application development",
		parts: 
		[
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State a component",
				exercises: 14,
			}
		]
	}

	return (
		<>
			<Header course = {course.name} />
			<Content parts= {course.parts} />
			<Total parts= {course.parts} />
		</>
	)
}
*/

import { useState } from "react"

const	Header = (props) =>
{
	return (
		<div>
			<h1>{props.header}</h1>
		</div>
	)
}

const	Statistics = ({text, rate, text2}) =>
{
	return (
		<div>
			<p>{text} {rate} {text2}</p> 
		</div>
	)
}

const	Display = ({rate}) =>
{
	return (
		<div>
			<Statistics text = {rate[0].text} rate = {rate[0].value} />
			<Statistics text = {rate[1].text} rate = {rate[1].value} />
			<Statistics text = {rate[2].text} rate = {rate[2].value} />
			<Statistics text = {rate[3].text} rate = {rate[3].value} />
			<Statistics text = {rate[4].text} rate = {rate[4].value} />
			<Statistics text = {rate[5].text} rate = {rate[5].value} text2 = {rate[5].text2} />
		</div>
	)
}

const	Button = ({handleClick, text}) =>
{
	return (
		<button onClick = {handleClick}>
			{text}
		</button>
	)
}

const App = () =>
{
	const	header =
	{
		headerOne: "give feedback",
		headerTwo: "statistics"
	}
	const	[good, setGood] = useState(0);
	const	[neutral, setNeutral] = useState(0);
	const	[bad, setBad] = useState(0);
	const	[total, setTotal] = useState(0);
	const	[accumulated, setAccumulated] = useState(0);
	const	[average, setAverage] = useState(0);
	const	[positive, setPositive] = useState(0);
	const	rate =
	[		
		{
			text: "good",
			value: good,
		},	
		{
			text: "neutral",
			value: neutral,
		},
		{
			text: "bad",
			value: bad,
		},	
		{
			text: "total",
			value: total,
		},
		{
			text: "average",
			value: average,
		},
		{
			text: "positive",
			value: positive,
			text2: " %"
		},
	]
	
	const	increaseGood = () => 
	{
		const 	updatedGood = good + 1;
		const 	updatedTotal = total + 1;
		const 	updatedAccumulated = accumulated + 1;
		const 	updatedAverage = updatedAccumulated / updatedTotal;
		const 	updatedPositive = (updatedGood / updatedTotal) * 100;
		
		setGood(updatedGood);
		setTotal(updatedTotal);
		setAccumulated(updatedAccumulated)
		setAverage(updatedAverage);
		setPositive(updatedPositive);
	}
	const	increaseNeutral = () => 
	{
		const 	updatedTotal = total + 1;
		const 	updatedAccumulated = accumulated + 0;
		const 	updatedAverage = updatedAccumulated / updatedTotal;
		const 	totalPositives = good;
		const 	updatedPositive = (totalPositives / updatedTotal) * 100;


		setNeutral(neutral + 1);
		setTotal(updatedTotal);
		setAccumulated(updatedAccumulated)
		setAverage(updatedAverage);
		setPositive(updatedPositive);
	}
	const	increaseBad = () => 
	{
		const 	updatedBad = bad + 1;
		const 	updatedTotal = total + 1;
		const 	updatedAccumulated = accumulated - 1;
		const 	updatedAverage = updatedAccumulated / updatedTotal;
		const 	totalPositives = good;
		const 	updatedPositive = (totalPositives / updatedTotal) * 100;

		setBad(updatedBad);
		setTotal(updatedTotal);
		setAccumulated(updatedAccumulated)
		setAverage(updatedAverage);
		setPositive(updatedPositive);
	}
	console.log(total, average);
	console.log(rate[0].value);
	return (
		<>
			<Header header = {header.headerOne} />
			<Button  
				handleClick = {increaseGood}
				text = "good"
			/>
			<Button  
				handleClick = {increaseNeutral}
				text = "neutral"
			/>
			<Button  
				handleClick = {increaseBad}
				text = "bad"
			/>
			<Header	header = {header.headerTwo} />
			<Display rate = {rate} />
		</>
	)
}

export default App