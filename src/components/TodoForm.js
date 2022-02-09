import React from 'react'

export default props =>
  <form onSubmit = {props.handleSaveToDo}>
    <input
      type='text'
      value={props.currentTodo.value}
      onChange={props.handleNewTodoValue}
      className="new-todo"
      placeholder="What needs to be done?"/>
  </form>
