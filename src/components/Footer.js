import React from 'react'
import {Link} from 'react-router-dom'

export default props =>
  <footer className="footer">
    <span className="todo-count">
      <strong>{props.remainingTodos}</strong> 
      {props.remainingTodos === 1 ? ' todo' : ' todos'} left
    </span>
    <ul className="filters">
      <li><Link to="/">All</Link></li>
      {' '}
      <li><Link to="/active">Active</Link></li>
      {' '}
      <li><Link to="/completed">Completed</Link></li>
    </ul>
  </footer>
