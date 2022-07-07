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
        label: ''
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label.charAt(0).toUpperCase() + this.state.label.slice(1));
        this.setState({
            label: ''
        })
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type='text'
                       className='new-todo'
                       placeholder="What needs to be done?" autoFocus
                       onChange={this.onLabelChange}
                       value={this.state.label}
                />
            </form>
        );
    }
};
