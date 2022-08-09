import React, {useState, useEffect} from 'react';
//import PropTypes from 'prop-types';

import './task.css'

const Task = ({onEdit, time, onDeleted, onToggleCompleted, completed, editing, onEditing, label, timerMin, timerSec}) => {
    const [labelTask, setLabel] = useState(label);
    const [ timeLeft, setTimeLeft ] = useState(Number(timerMin) * 60 + Number(timerSec))
    const [ isCounting, setIsCounting ] = useState(false)
    const min = getPadTime(Math.floor(timeLeft / 60))
    const sec = getPadTime(timeLeft - min * 60)

    const onEditChange = (e) => {
        setLabel(e.target.value)
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onEdit(labelTask.charAt(0).toUpperCase() + labelTask.slice(1));
        setLabel(label)
    };

    useEffect(() => {
        const interval = setInterval(() => {
            isCounting &&
                setTimeLeft((timeLeft) => timeLeft >= 1 ? timeLeft - 1 : 0)
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [isCounting])


    function getPadTime(time) {
        return time.toString().padStart(2, '0')
    }

    let classNames;
    if (completed) {
        classNames += ' completed'
    }
    if (editing) {
        classNames += ' editing'
    }

    return (
        <form className={classNames} onSubmit={onSubmit}>
            <div className='view'>
                <input className='toggle' type='checkbox'
                       onClick={onToggleCompleted}/>
                <label>
                    <span className='description'>{label}</span>
                    <span className='time'>{time}</span>
                </label>
                <button className='icon icon-edit'
                        onClick={onEditing}/>
                <button className='icon icon-destroy'
                        onClick={onDeleted}/>
                <span className='created'>
                        <button className="icon icon-play" onClick={() => setIsCounting(true)} />
                        <button className="icon icon-pause" onClick={() => setIsCounting(false)} />
                    <span className='times'>
                        {min}:{sec}
                    </span>
                </span>
            </div>
            <input type='text'
                   className='edit'
                //value={labelTask}
                   onChange={onEditChange}
            />
        </form>
    );
}

export default Task;