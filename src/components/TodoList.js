import React from 'react'

const TodoItem = props =>
  <li className={props.isComplete ? "completed" : ""}>
    <div className="view">
      <input className="toggle" type="checkbox" checked={props.isComplete} onChange={() => props.handleToggle(props.id)}/>
      <label>
        {props.name}
      </label>
      <button className="destroy" onClick={(event) => props.handleDeleteToDo(event, props.id)} />
    </div>
  </li>

export default props =>
  <ul className="todo-list">
    {props.todos.map(todo => <TodoItem key={todo.id} {...todo} handleDeleteToDo={props.handleDeleteToDo} handleToggle={props.handleToggle}/>)}
  </ul>
