import React from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames'

const TodoItem = props => {
    return (
        <div>
            <div key={props.todo.id} className="todo-item">
                <div className="todo-item-left">
                <input checked={props.todo.completed} onChange={(event) => props.checkTodo(props.todo, props.index, event)} type="checkbox" />
                {!props.todo.editing && 
                <div onDoubleClick={(event) => props.editTodo(props.todo, props.index, event)} className={classnames({'todo-item-label' : true, 'completed' : props.todo.completed})}>{props.todo.title}</div>
                }
                {props.todo.editing && 
                <input onKeyUp={(event) => {
                    if(event.key === 'Enter'){
                    props.doneEdit(props.todo, props.index, event)}
                    else if (event.key === 'Escape') {
                    props.cancelEdit(props.todo, props.index, event)
                    }
                }
                } onBlur={(event) => props.doneEdit(props.todo, props.index, event)} defaultValue={props.todo.title} className="todo-item-edit" type="text" autoFocus/>
                }
                </div>
                <div className="remove-item" onClick={(event) => props.deleteTodo(props.index)}>
                &times;
                </div>
            </div>
        </div>
    );
};

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    checkTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    doneEdit: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;