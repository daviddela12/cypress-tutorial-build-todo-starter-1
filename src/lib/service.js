import axios from "axios";

export const saveToDo = (todo) => {
    console.log("saveToDo");
    return axios.post("http://localhost:3030/api/todos", todo);
}

export const loadToDos = () => axios.get("http://localhost:3030/api/todos");