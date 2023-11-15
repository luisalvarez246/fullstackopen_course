import axios from 'axios'

const	baseUrl = '/api/persons';
// const baseUrl = 'http://localhost:3001/persons'; //json-server

const	getAll = async () =>
{
	const	request = await axios.get(baseUrl);

	return (request.data);
}

const	create = async (personObject) =>
{
	const	request = await axios.post(baseUrl, personObject);

	return (request.data);
}

const	update = async (id, newPerson) =>
{
	const	request = await axios.put(`${baseUrl}/${id}`, newPerson);

	return (request.data);
}

const	deletePerson = async (id) =>
{
	const	request = await axios.delete(`${baseUrl}/${id}`);

	return (request);
}

export default { getAll, create, deletePerson, update }