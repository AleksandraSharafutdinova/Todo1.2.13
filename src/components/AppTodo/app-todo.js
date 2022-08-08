import React, {useState} from "react";
import { formatDistanceToNow } from 'date-fns';

import Header from "../header/header";
import TaskList from "../task-list/task-list";
import NewTaskForm from "../new-task-form/new-task-form";
import Footer from "../footer";

import './app-todo.css'

const AppTodo = () => {

    let maxId = 100;

    const createTodoItem = (label, min, sec) => {
        return {
            label,
            timerMin: min || '1',
            timerSec: sec || '30',
            completed: false,
            time: `created ${formatDistanceToNow(new Date(), { addSuffix: true })}`,
            id: maxId++,
            editing: false,
        }
    };

    const [todoData, setTodoData] = useState([createTodoItem('Сова'), createTodoItem('Енот'), createTodoItem('Кошка')]);
    const [filter, setFilter] = useState('All');

    const deleteItem = (id) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const newArray = [
            ...todoData.slice(0, idx),
            ...todoData.slice(idx + 1)
        ]
        setTodoData(newArray);
    }

    const addItem = (text, min, sec) => {
        const newItem = createTodoItem(text, min, sec);
        setTodoData(todoData.concat(newItem));
    };

    const toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ]
    };

    const onToggleCompleted = (id) => {
        const newArray = toggleProperty(todoData, id, 'completed');
        setTodoData(newArray);
    }

    const getTasksByFilter = () => {
        switch (filter) {
            case 'all':
                return todoData;
            case 'active':
                return todoData.filter((item) => !item.completed);
            case 'completed':
                return todoData.filter((item) => item.completed);
            default:
                return todoData;
        }
    };

    const tasks = getTasksByFilter();
    const onFilterChange = (filter) => {
        setFilter(filter);
    };

    const onClearCompleted = () => {
        setTodoData(todoData.filter((task) => !task.completed));
    };

    const onEditing = (id) => {
        const newArr = toggleProperty(todoData, id, 'editing')
        setTodoData(newArr)
    }


    const onEdit = (text, id) => {
        const newArray = todoData.map(el => {
                        if (el.id === id) {
                            el = {...el, label: text}
                        }
                        return el;
                    });
        setTodoData(newArray)
    }

    const completedCount = todoData
        .filter((el) => el.completed).length;
    const todoCount = todoData.length - completedCount;

    return (
        <div className='todoapp'>
            <div className='header'>
                <Header />
                <NewTaskForm onItemAdded={addItem} />
            </div>
            <TaskList
                      tasks={tasks}
                      onDeleted={deleteItem}
                      onToggleCompleted={onToggleCompleted}
                      onEditing={onEditing}
                      onEdit={onEdit}
            />
            <Footer
                    done={todoCount}
                    filter={filter}
                    onFilterChange={onFilterChange}
                    onClearCompleted={onClearCompleted}
            />
        </div>
    );
}

export default AppTodo;


