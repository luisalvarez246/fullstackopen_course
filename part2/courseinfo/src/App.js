const	Header = ({name, name2}) =>
{
	console.log(name);
	if (name2 != null)
	{
		return (
			<div>
				<h3>{name2}</h3>
			</div>
		)
	}
	return (
		<div>
			<h1>{name}</h1>
		</div>
	)
}

const	Part = ({part, exercise}) =>
{
	console.log(part, exercise);
	return (
		<p>{part} {exercise}</p>
	)
}

const	Total = ({number}) =>
{
	const	initialValue = 0;
	let		total;
	
	total = number.reduce((accumulator, currentValue) =>
		{
			return (accumulator + currentValue.exercises);
		},
			initialValue
		);
	
	return (
		<div>
			<p>Number of exercises {total}</p>
		</div>
	)
}

const	Content = ({course}) =>
{
	return (
		<div>
			{
				course.map(item => 
				{
					return [
						<Header name2 = {item.name} key = {item.id} />, 
						item.parts.map(part => 
						{
							return [
								<Part part = {part.name} exercise = {part.exercises} key = {part.id}/>,
							]
						}
						),
						<Total number = {item.parts} />
					]
				}
				)
			}
		</div>
	)
}

const	Course = ({course}) =>
{
	//const	newArray = course.parts.map(part => part.name);
	//console.log(newArray);
	return (
		<>
			<Header name = "Web development curriculum" />
			<Content course = {course} />
		</>
	)
}

const	App = () =>
{
	const course =
	[
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
		},
		{
			name: "Node.js",
			parts: 
			[
				{
					name: "Routing",
					exercises: 10,
				},
				{
					name: "Middlewares",
					exercises: 7,
				}
			]
		}
	]

	for (let i = 0; i < course.length; i++)
	{
		for (let id = 0; id < course[i].parts.length; id++)
		{
			course[i].parts[id].id = id;
		}
		course[i].id = i;
	}
	console.log(course[1].parts[1].id);
	console.log(course[0].id);
	return (<Course course = {course} />)
}

export default App