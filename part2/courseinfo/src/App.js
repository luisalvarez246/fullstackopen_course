const	Header = ({name}) =>
{
	return (
		<div>
			<h1>{name}</h1>
		</div>
	)
}

const	Part = ({part, exercise}) =>
{
	return (
		<p>{part} {exercise}</p>
	)
}

const	Content = ({course}) =>
{
	return (
		<div>
			{course.parts.map(part => 
				<Part part = {part.name} exercise = {part.exercises} key = {part.id} />
			)}
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

const	Course = ({course}) =>
{
	const	newArray = course.parts.map(part => part.name);
	console.log(newArray);
	return (
		<>
			<Header name = {course.name} />
			<Content course = {course} />
		</>
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
	for (let id = 0; id < course.parts.length; id++)
	{
		course.parts[id].id = id;
	}
	console.log(course.parts);
	return (<Course course = {course} />)
}

export default App