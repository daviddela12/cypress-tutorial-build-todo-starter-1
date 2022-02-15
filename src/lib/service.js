import axios from "axios";

export const saveToDo = (todo) => {
    return axios.post("/api/todos", todo);
}

export const loadToDos = () => axios.get("/api/todos");

export const deleteToDo = (id) => axios.delete(`/api/todos/${id}`);

export const updateToDo = (todo) => axios.put(`/api/todos/${todo.id}`, todo);