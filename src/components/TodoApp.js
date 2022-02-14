import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Footer from './Footer'
import { saveToDo, loadToDos } from '../lib/service'


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
 
  componentDidMount() {
    loadToDos()
      .then(({data}) => this.setState({todos: data}))
      .catch(() => this.setState({error: true}));
  }


  handleNewTodoValue(event) {
    this.setState({currentTodo: event.target.value});
  }

  handleSaveToDo(event) {
    event.preventDefault();
    const newTodo = {name: this.state.currentTodo, isComplete: false};
    saveToDo(newTodo).then(({data}) => {
      this.setState({
        todos: this.state.todos.concat(data),
        currentTodo: ''
      });
    }).catch(() => this.setState({error: true}));
  }

  render () {
    const remainingTodos = this.state.todos.filter(t => !t.isComplete).length;
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            {this.state.error ? <span className="error">Oh no!</span> : null}
            <TodoForm 
              currentTodo = {this.state.currentTodo}
              handleSaveToDo = {this.handleSaveToDo}
              handleNewTodoValue = {this.handleNewTodoValue}
            />
          </header>
          <section className="main">
            <TodoList todos={this.state.todos} />
          </section>
          <Footer remainingTodos={remainingTodos}/>
        </div>
      </Router>
    )
  }
}
