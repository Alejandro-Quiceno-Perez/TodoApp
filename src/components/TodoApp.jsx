import React, { useState } from 'react'
import { Todo } from './Todo';

const TodoApp = () => {

    const [title, setTitle] = useState('');
    const [todo, setTodo] = useState([]);
    const [editItem, setEditItem] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;

        setTitle(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTodo = {
            id: Date.now(),
            title: title,
            completed: false
        }

        const oldTodos = [...todo];
        oldTodos.unshift(newTodo);

        setTodo(oldTodos);
        setTitle("");
    }

    const handleUpdate = (id, value) => {
        const temp = [...todo];
        const item = temp.find((item) => item.id === id);
        item.title = value;

        setTodo([...temp]);
    }

    const handleDelete = (id) => {
        const tempTodos = todo.filter((item) => item.id !== id);
        setTodo([...tempTodos]);
    }

    const handleCheckboxChange = (id, status) => {
        const temp = [...todo];
        const item = temp.find((item) => item.id === id);
        item.completed = status;

        setTodo([...temp]);
    }

    return (
        <div className='todoContainer'>

            <form className='todoCreateForm' onSubmit={handleSubmit}>
                <input className='todoInput' value={title} onChange={handleChange} />
                <input type="submit" value="Crear Tarea" className='buttonCreate' onClick={handleSubmit} />
            </form>

            <div className="todosContainer">
                {
                    todo.map((item) => (
                        <Todo
                            key={item.id}
                            item={item}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                            onComplete={handleCheckboxChange}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default TodoApp
