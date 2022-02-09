import React from 'react'

export default props =>
  <form onSubmit = {props.handleSaveToDo}>
    <input
      type='text'
      value={props.currentTodo}
      onChange={props.handleNewTodoValue}
      className="new-todo"
      placeholder="What needs to be done?"/>
  </form>
