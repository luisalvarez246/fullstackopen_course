const	Header = ({name, name2}) =>
{
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
			<p><strong>Total of {total} exercises</strong></p>
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
						<Total number = {item.parts} key = {item.id + item.length}/>
					]
				}
				)
			}
		</div>
	)
}

const	Course = ({course}) =>
{
	return (
		<>
			<Header name = "Web development curriculum" />
			<Content course = {course} />
		</>
	)
}

export default Course