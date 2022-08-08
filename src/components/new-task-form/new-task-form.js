import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css'

const NewTaskForm = ({onItemAdded}) => {

    const [label, setLabel] = useState('');
    const [min, setMin] = useState('');
    const [sec, setSec] = useState('');


    const onLabelChange = (e) => {
        setLabel(e.target.value)
    }

    const onChangeTime = (e) => {
        const { value, name } = e.target;

        if (value.trim() && +value <= 59 && +value >= 0 && !Number.isNaN(value)) {
            if (name === 'secValue') {
                setSec(value);
            }
            if (name === 'minValue') {
                setMin(value);
            }
        }
        if (!value.trim()) {
            setSec('');
            setMin('');
        }
    }

    const onSubmit = (e) => {
        if (e.key === 'Enter') {
            if (label === '') {
                onItemAdded('Задача', min, sec)
            } else {
                onItemAdded(label.charAt(0).toUpperCase() + label.slice(1), min, sec)
            }
            setLabel('');
            setMin('');
            setSec('');
        }
    }

    return (
        <form onKeyPress={onSubmit} className='new-todo-form'>
            <input type='text'
                   className='new-todo'
                   placeholder="What needs to be done?" autoFocus
                   onChange={onLabelChange}
                   value={label}
                   name='label'
            />
            <input className="new-todo-form__timer"
                   autoFocus
                   name='minValue'
                   placeholder="Min"
                   value={min}
                   onChange={onChangeTime}

            />
            <input className="new-todo-form__timer"
                   placeholder="Sec"
                   name='secValue'
                   onChange={onChangeTime}
                   value={sec}
            />
        </form>
    )
};

NewTaskForm.defaultProps = {
    onLabelChange: () => {},
    onSubmit: () => {},
    onChangeTime: () => {},
}

NewTaskForm.propTypes = {
    onLabelChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onChangeTime: PropTypes.func,
}

export default NewTaskForm;