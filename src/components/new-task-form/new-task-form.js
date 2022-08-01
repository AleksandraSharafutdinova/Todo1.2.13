import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css'

export default class NewTaskForm extends Component {

    static defaultProps = {
        onLabelChange: () => {},
        onSubmit: () => {},
    };

    static propTypes = {
        onLabelChange: PropTypes.func,
        onSubmit: PropTypes.func,
    };

    state = {
        label: '',
        minValue: '',
        secValue: ''
    };

    onLabelChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    onSubmit = (e) => {
        if (e.key === 'Enter') {
            if (this.state.label === '') {
               this.props.onItemAdded('Задача', this.state.minValue, this.state.secValue)
            } else {
                this.props.onItemAdded(this.state.label.charAt(0).toUpperCase() + this.state.label.slice(1), this.state.minValue, this.state.secValue)
            }
            this.setState({
                label: '',
                minValue: '',
                secValue: ''
            })
        }
    };

    render() {
        const {label, minValue, secValue} = this.state;
        return (
            <form onKeyPress={this.onSubmit} className='new-todo-form'>
                <input type='text'
                       className='new-todo'
                       placeholder="What needs to be done?" autoFocus
                       onChange={this.onLabelChange}
                       value={label}
                       name='label'
                />
                <input className="new-todo-form__timer"
                       autoFocus
                       name='minValue'
                       placeholder="Min"
                       value={minValue}
                       onChange={this.onLabelChange}

                />
                <input className="new-todo-form__timer"
                       placeholder="Sec"
                       name='secValue'
                       onChange={this.onLabelChange}
                       value={secValue}
                />
            </form>
        );
    }
};
