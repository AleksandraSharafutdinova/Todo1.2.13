import React, {Component} from 'react';
import './footer.css'
import PropTypes from 'prop-types';

export default class Footer extends Component {

    static defaultProps = {
        onFilterChange: () => {},
        onClearCompleted: () => {},
        done: 0,
    };

    static propTypes ={
        done: PropTypes.number,
        onFilterChange: PropTypes.func,
        onClearCompleted: PropTypes.func
    };


    buttons = [
        { name: 'all', label: 'All'},
        { name: 'active', label: 'Active'},
        { name: 'completed', label: 'Completed'}
    ];

    render () {

        const {filter, onFilterChange, onClearCompleted, done} = this.props;

        const buttons = this.buttons.map(({name, label}) => {
            const isActive = filter === name;
            const clazz = isActive ? 'selected' : 'trying';
            return (
                <button type='button'
                        key = {name}
                        className={clazz}
                        onClick = {() => onFilterChange(name)}>
                {label}
                </button>
            )
        });


        return (
            <div className='footer'>
                <span className='todo-count'>{done} items left</span>
                <ul className='filters'>
                    <li>
                        {buttons}
                    </li>
                </ul>
                <button className='clear-completed'
                onClick={onClearCompleted}>
                    Clear completed
                </button>
            </div>
        )
    }
};

