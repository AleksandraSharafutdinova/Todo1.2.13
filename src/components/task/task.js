import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './task.css'

export default class Task extends Component {

    static defaultProps = {
        onDeleted: () => {},
        onToggleCompleted: () => {},
        onEditing: () => {},
    };

    static propTypes = {
        onDeleted: PropTypes.func,
        onToggleCompleted: PropTypes.func,
        onEditing: PropTypes.func
    };

    state = {
        label: this.props.label,
        isCounting: false,
        minutes: this.props.minValue,
        seconds: this.props.secValue
    };

    startTimer = (e) => {
        e.preventDefault();
        this.setState({
            isCounting: true
        })
        this.myInterval = setInterval(() => {
            const {seconds, minutes} = this.state

            if(seconds > 0) {
                this.setState(({seconds}) => ({
                    seconds: seconds - 1
                }))
            }
            if(seconds === 0) {
                if(minutes === 0) {
                    clearInterval(this.myInterval)
                    this.setState({
                        isCounting: false
                    })
                } else {
                    this.setState(({minutes}) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

    handlePause = (event) => {
        event.stopPropagation();
        this.setState({ isCounting: false });
        clearInterval(this.myInterval);
    };

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    onEditChange = (e) => {
        this.setState({
            label: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onEdit(this.state.label.charAt(0).toUpperCase() + this.state.label.slice(1));
        this.setState({
            label: this.state.label
        });
    };


    render() {

        const {time, onDeleted, onToggleCompleted, completed, editing, onEditing,} = this.props;
        const {label, minutes, seconds,} = this.state;
        const timer = seconds === 0 && minutes === 0 ? <span className='exclamation'>!</span> : null;

        let classNames;
        if (completed) {
            classNames += ' completed'
        }
        if (editing) {
            classNames += ' editing'
        }


        return (
            <form className={classNames} onSubmit={this.onSubmit}>
                <div className='view'>
                    <input className='toggle' type='checkbox'
                           onClick={onToggleCompleted}/>
                    <label>
                        <span className='description'>{this.props.label}</span>
                        <span className='time'>{time}</span>
                    </label>
                    <button className='icon icon-edit'
                            onClick={onEditing}/>
                    <button className='icon icon-destroy'
                            onClick={onDeleted}/>
                    <span className='created'>
                        <button className="icon icon-play" onClick={this.startTimer} />
                        <button className="icon icon-pause" onClick={this.handlePause}/>
                        <span className='times'>
                            {minutes}:{seconds}
                            {timer}
                        </span>
                    </span>
                </div>
                <input type='text'
                       className='edit'
                       value={label}
                       onChange={this.onEditChange}
                />
            </form>
        )
    }
};