import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as classnames from 'classnames'

class App extends Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="Todo-container">
          <input ref={this.todoInput} onKeyUp={this.addTodo} type="text" className="todo-input" placeholder="What needs to be done"/>
          
          {this.state.todos.map((todo, index) =>
            <div key={todo.id} className="todo-item">
              <div className="todo-item-left">
                <input onChange={(event) => this.checkTodo(todo, index, event)} type="checkbox" />
                {/*<div className={"todo-item-label " + (todo.completed ? 'completed' : '')}>{todo.title}</div>*/}
                {!todo.editing && 
                <div onDoubleClick={(event) => this.editTodo(todo, index, event)} className={classnames({'todo-item-label' : true, 'completed' : todo.completed})}>{todo.title}</div>
                }
                {todo.editing && 
                  <input onKeyUp={(event) => {
                    if(event.key === 'Enter'){
                    this.doneEdit(todo, index, event)}
                    else if (event.key === 'Escape') {
                      this.cancelEdit(todo, index, event)
                    }
                  }
                  } onBlur={(event) => this.doneEdit(todo, index, event)} defaultValue={todo.title} className="todo-item-edit" type="text" autoFocus/>
                }
              </div>
              <div className="remove-item" onClick={(event) => this.deleteTodo(index)}>
                &times;
              </div>
            </div>
          )}

          <div className="extra-container">
            <div><label><input type="checkbox"/> Check All</label></div>
            <div>2 items left</div>
          </div>

          <div className="extra-container">
            <div>
              <button>All</button>
              <button>Active</button>
              <button>Completed</button>
            </div>
            <div>
              <button>Clear Completed</button>
            </div>
          </div>

        </div> {/* End Todo-Container */}
      </div>
    );
  }

  todoInput = React.createRef();

  state = {
    beforeEditCache: '',
    idForTodo: 3,
    todos:[
      {
        'id': 1,
        'title': 'Finish React Screencast',
        'completed': false,
        'editing': false,
      },
      {
        'id': 2,
        'title': 'Take over world',
        'completed': false,
        'editing': false,
      }
    ]
  }

  addTodo = event => {
    if(event.key === 'Enter'){
      const todoInput = this.todoInput.current.value;
      if(todoInput.trim().length === 0) return;
      this.setState((prevState, props) => {
        let todos = prevState.todos;
        let idForTodo = prevState.idForTodo + 1;
        todos.push({
          id: idForTodo,
          title: todoInput,
          completed: false,
        })
        return { todos, idForTodo };
      });
      this.todoInput.current.value = '';
    }
  }

  deleteTodo = index => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todos.splice(index, 1);

      return { todos };
    });
  }

  checkTodo = (todo, index, event) => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todo.completed = !todo.completed;
      todos.splice(index, 1, todo);

      return { todos };
    });
  }

  editTodo = (todo, index, event) => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todo.editing = true;
      todos.splice(index, 1, todo);

      return { todos, beforeEditCache: todo.title };
    });
  }

  doneEdit = (todo, index, event) => {
    event.persist();
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todo.editing = false;
      if(event.target.value.trim().length === 0){
        todo.title = prevState.beforeEditCache;
      } else {
        todo.title = event.target.value;
      }
      
      todos.splice(index, 1, todo);

      return { todos };
    });
  }

  cancelEdit = (todo, index, event) => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todo.tltle = prevState.beforeEditCache;
      todo.editing = false;
      todos.splice(index, 1, todo);

      return { todos };
    });
  }
}

export default App;
