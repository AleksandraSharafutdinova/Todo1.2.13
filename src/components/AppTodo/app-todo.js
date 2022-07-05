import React from "react";

import Header from "../header";
import TaskList from "../task-list";
import NewTaskForm from "../new-task-form";
import Footer from "../footer";
import TaskFilter from "../task-filter";

import './app.css'

const todoDate = [
    {label: 'Try To Survive Here', important: true, id: 1},
    {label: 'Drink Coffee', important: false, id: 2},
    {label: 'Understand React', important: false, id: 3}
];

const AppTodo = () => {
    return (
        <div className='todo-app'>
            <Header />
            <NewTaskForm />
            <TaskList todos={todoDate}/>
            <Footer />
            <TaskFilter />
        </div>
    );
}