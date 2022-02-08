import React from 'react'

export default props =>
  <form>
    <input
      type='text'
      value={props.currentTodo.value}
      className="new-todo"
      placeholder="What needs to be done?"/>
  </form>
