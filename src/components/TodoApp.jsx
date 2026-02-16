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


    return (
        <div className='my-4 w-100 h-100'>

            <form className='mb-3' onSubmit={handleSubmit}>
                <label for="inputTarea" className='form-label'>Ingresa tu tarea aqui!</label>
                
                <div className="d-flex gap-2">
                    <input id="inputTarea" className='form-control' value={title} onChange={handleChange} />
                    <input type="submit" value="Crear Tarea" className='btn btn-primary' onClick={handleSubmit} />
                </div>
            </form>

            <div className="w-100 h-100">
                {
                    todo.map((item) => (
                        <Todo
                            key={item.id}
                            item={item}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default TodoApp
