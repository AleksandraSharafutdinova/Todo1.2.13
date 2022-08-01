import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task'

import './task-list.css'

const TaskList = ({todos, onDeleted, onToggleCompleted, onEditing, onEdit }) => {

    const elements = todos.map((item) => {

        const {id, ...itemProps} = item;

        return (
                <li key={id}>
                    <Task {...itemProps}
                    onDeleted={ () => onDeleted(id)}
                    onToggleCompleted={() => onToggleCompleted(id)}
                    onEditing={() => onEditing(id)}
                    onEdit={(e) => onEdit(e, id)}/>
                </li>
            )
        });

    return (
        <ul className='todo-list'>
            {elements}
        </ul>
    );
}

TaskList.defaultProps = {
    onDeleted: () => {},
    onToggleCompleted: () => {},
    onEditing: () => {},
    onEdit: () => {},
}

TaskList.propTypes = {
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onEditing: PropTypes.func,
    onEdit: PropTypes.func
}

export default TaskList;