import React, {Component} from "react";
import { formatDistanceToNow } from 'date-fns';

import Header from "../header/header";
import TaskList from "../task-list/task-list";
import NewTaskForm from "../new-task-form/new-task-form";
import Footer from "../footer";

import './app-todo.css'

export default class AppTodo extends Component {

    maxId = 100;

    state = {
        todoDate: [
            this.createTodoItem('Купить банан'),
            this.createTodoItem('Купить яблоко'),
            this.createTodoItem('Покушать')
        ],
        term: '',
        filter: 'all',

    };

    createTodoItem(label) {
        return {
            label,
            completed: false,
            time: `created ${formatDistanceToNow(new Date(), { addSuffix: true })}`,
            id: this.maxId++,
            editing: false
        }
    };

    deleteItem = (id) => {
        this.setState(({todoDate}) => {
            const idx = todoDate.findIndex((el) => el.id === id);
            const newArray = [
                ...todoDate.slice(0, idx),
                ...todoDate.slice(idx + 1)
            ]
            return {
                todoDate: newArray
            }
        });
    };

    addItem = (text) => {
        if (text.length === 0) {
            return
        }
        const newItem = this.createTodoItem(text);

        this.setState(({todoDate}) => {
            const newArr = [
                ...todoDate,
                newItem
            ];
            return {
                todoDate: newArr
            }
        })
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ]
    };

    onToggleCompleted = (id) => {
        this.setState(({todoDate}) => {
            return {
                todoDate: this.toggleProperty(todoDate, id, 'completed')
            };
        });
    };

    onFilterChange = (filter) => {
        this.setState({filter});
    };

    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        });
    };

    filter (items, filter) {
        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.completed);
            case 'completed':
                return items.filter((item) => item.completed);
            default:
                return items;
        }
    };

    onClearCompleted = () => {
        this.setState(({todoDate}) => {
            const newArray = [
                ...todoDate.filter((todo) => !todo.completed)
                    ]
                    return {
                        todoDate: newArray
                    }
        });
    };


    onEditing = (id) => {
        this.setState(({todoDate}) => {
            return {
                todoDate: this.toggleProperty(todoDate, id, 'editing')
            };
        });
    };



    onEdit = (text, id) => {

        if (text.length === 0) {
            this.deleteItem(id)
        }

        this.setState(({ todoDate }) => {

            const newArray = todoDate.map(el => {
                if (el.id === id) {
                    el = {...el, label: text}
                }
                return el;
            });
            return {
                todoDate: newArray
            }
        });
    };


    render() {

        const {todoDate, term, filter,} = this.state;

        const visibleItems = this.filter(
            this.search(todoDate, term), filter);

        const completedCount = todoDate
                               .filter((el) => el.completed).length;
        const todoCount = todoDate.length - completedCount;



        return (
            <div className='todoapp'>
                <div className='header'>
                    <Header />
                    <NewTaskForm onItemAdded={this.addItem} />
                </div>
                <TaskList todos={visibleItems}
                          onDeleted={this.deleteItem}
                          onToggleCompleted={this.onToggleCompleted}
                          onEditing={this.onEditing}
                          onEdit={this.onEdit}/>
                <Footer done={todoCount}
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                        onClearCompleted={this.onClearCompleted}
                        />
            </div>
        );
    };
};


