import axios from "axios";

export const saveToDo = (todo) => {
    return axios.post("http://localhost:3030/api/todos", todo);
}