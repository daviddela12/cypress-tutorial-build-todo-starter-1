import axios from "axios";

export const saveToDo = (todo) => {
    return axios.post("http://localhost:3030/api/todos", todo);
}

export const loadToDos = () => axios.get("http://localhost:3030/api/todos");

export const deleteToDo = (id) => axios.delete(`http://localhost:3030/api/todos/${id}`);

export const updateToDo = (todo) => axios.put(`http://localhost:3030/api/todos/${todo.id}`, todo);