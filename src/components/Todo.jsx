import React, { useState } from 'react'

export const Todo = ({ item, onUpdate, onDelete, onComplete }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState(item.title ?? "");

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleClickUpdateTodo = () => {
        onUpdate(item.id, value);
        setIsEdit(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(item.id, value)
        setIsEdit(false);
    }

    const handleCheckBoxChange = (e) => {
        onComplete(item.id, e.target.checked);
    }


    return (
        <div className="todo">
            {
                isEdit ? (
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                            className='todoInput'
                            value={value}
                            onChange={handleChange}
                        />

                        <button className='btn-update' onClick={handleClickUpdateTodo}>Update</button>
                    </form>
                ) : (
                    <div className='todoInfo'>
                        <input type={"checkbox"}
                            onChange={handleCheckBoxChange}
                            checked={item.completed}
                        />

                        <span className='todoTitle'>
                            {item.title}
                        </span>
                        <button className='btn-edit' onClick={() => setIsEdit(true)}>Edit</button>

                        <button className='btn-delete' onClick={() => onDelete(item.id)}>Delete</button>
                    </div>
                )
            }
        </div>
    )
}
