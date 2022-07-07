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
        label: this.props.label
    };

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
                        <span className='created'>{time}</span>
                    </label>
                    <button className='icon icon-edit'
                            onClick={onEditing}/>
                    <button className='icon icon-destroy'
                            onClick={onDeleted}/>
                </div>
                <input type='text'
                       className='edit'
                       value={this.state.label}
                       onChange={this.onEditChange}
                />
            </form>
        )
    }
};
