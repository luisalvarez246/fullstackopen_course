import { useState } from "react"

const	Button = ({handleClick, text}) =>
{
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	)
}

const 	Display = ({text, text2, votes, text3}) =>
{
	return (
		<div>
			<h4>{text}</h4>
			<p>{text2} {votes} {text3}</p>
		</div>
	)
}

const	DisplayFavorite = ({numberOfVotes, text, text2, votes, text3}) =>
{
	if (numberOfVotes === 0)
	{
		return (
			<div>
				<p>No votes yet</p>
			</div>
		)
	}
	return (
		<div>
			<h4>{text}</h4>
			<p>{text2} {votes} {text3}</p>
		</div>
	)
}

const	App = () =>
{
	const anecdotes = 
	[
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.'
	];
	const	[selected, setSelected] = useState(0);
	const	[voted, setVoted] = useState(Array(8).fill(0));

	const	randomSelected = () =>
	{
		const	randomNumber = Math.floor(Math.random() * 8);

		setSelected(randomNumber);
	}
	const	increaseVoted = () =>
	{
		const	updateVoted = [...voted];

		updateVoted[selected] += 1;
		setVoted(updateVoted);
	}
	const	numberOfVotes = Math.max(...voted);
	const	topVoted = voted.indexOf(numberOfVotes);
	console.log(voted);
	console.log(topVoted);
	return (
		<>
			<Display text = {anecdotes[selected]}
				text2 = "has" votes = {voted[selected]} text3 = "votes"/>
			<Button 
				handleClick = {increaseVoted}
				text = "vote"
			/>
			<Button 
				handleClick = {randomSelected}
				text = "next anecdote"
			/>
			<DisplayFavorite text = {anecdotes[topVoted]} numberOfVotes = {numberOfVotes} 
				text2 = "has" votes = {voted[topVoted]} text3 = "votes"/>
		</>
	)
}

export default App;
