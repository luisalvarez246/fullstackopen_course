import Course from "./components/Course"

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
				},
				{
					name: "Redux",
					exercises: 11,
				}
			]
		},
		{
			name: "Node.js",
			parts: 
			[
				{
					name: "Routing",
					exercises: 3,
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
	return (<Course course = {course} />)
}

export default App