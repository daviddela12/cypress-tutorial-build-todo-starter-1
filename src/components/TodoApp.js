import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Footer from './Footer'
import { saveToDo, loadToDos, deleteToDo, updateToDo } from '../lib/service'
import { filterTodos } from '../lib/utils'


export default class TodoApp extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      currentTodo: '',
      todos: []
    }

    this.handleNewTodoValue = this.handleNewTodoValue.bind(this);
    this.handleSaveToDo = this.handleSaveToDo.bind(this);
    this.handleDeleteToDo = this.handleDeleteToDo.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
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
    setTimeout(() => {
      saveToDo(newTodo).then(({data}) => {
        this.setState({
          todos: this.state.todos.concat(data),
          currentTodo: ''
        });
      }).catch(() => this.setState({error: true}));
    }, 5000)
  }

  handleDeleteToDo(event, id) {
    event.preventDefault();
    deleteToDo(id)
    .then(() => {
      this.setState({
        todos: this.state.todos.filter( t => t.id !== id)
      })
    });
  }

  handleToggle(id) {
    const target = this.state.todos.find(t => t.id === id);
    const updatedTarget = {
      ...target,
      isComplete: !target.isComplete
    }
    
    updateToDo(updatedTarget)
    .then(({data}) => {
      const targetIndex = this.state.todos.findIndex(
        t => t.id === data.id
      );
      /** REFACTORING WITH MAP
      const updateToDos = [
        ...this.state.todos.slice(0, targetIndex),
        data,
        ...this.state.todos.slice(targetIndex+1)
      ];
      */
     const updateToDos = this.state.todos.map( t => t.id === data.id ? data : t );

      this.setState({todos: updateToDos})
    });
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
            <Route path="/:filter?" 
                  render={({match}) => <TodoList todos={filterTodos(match.params.filter,  this.state.todos)} 
                                                handleDeleteToDo={this.handleDeleteToDo} handleToggle={this.handleToggle}/>}
            />
          </section>
          <Footer remainingTodos={remainingTodos}/>
        </div>
      </Router>
    )
  }
}
