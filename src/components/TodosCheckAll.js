import React from 'react';
import PropTypes from 'prop-types';

const TodosCheckAll = props => {
    return (
        <div>
            <label><input checked={!props.anyRemaining()} onChange={props.checkAllTodos} type="checkbox" /> Check All</label>
        </div>
    );
};

TodosCheckAll.propTypes = {
    anyRemaining: PropTypes.func.isRequired,
    checkAllTodos: PropTypes.func.isRequired,
};

export default TodosCheckAll;