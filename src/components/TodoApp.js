import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Footer from './Footer'
import { saveToDo } from '../lib/service'


export default class TodoApp extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      currentTodo: '',
      todos: []
    }

    this.handleNewTodoValue = this.handleNewTodoValue.bind(this);
    this.handleSaveToDo = this.handleSaveToDo.bind(this);
  }


  handleNewTodoValue(event) {
    this.setState({currentTodo: event.target.value});
  }

  handleSaveToDo(event) {
    event.preventDefault();
    console.log(this.state.currentTodo);
    const newTodo = {name: this.state.currentTodo, isComplete: false};
    saveToDo(newTodo).then((data) => {
      this.setState({
        todos: this.state.todos.concat(data),
        currentTodo: ''
      });
    });
  }

  render () {
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            <TodoForm 
              currentTodo = {this.state.currentTodo}
              handleSaveToDo = {this.handleSaveToDo}
              handleNewTodoValue = {this.handleNewTodoValue}
            />
          </header>
          <section className="main">
            <TodoList todos={this.state.todos} />
          </section>
          <Footer />
        </div>
      </Router>
    )
  }
}
