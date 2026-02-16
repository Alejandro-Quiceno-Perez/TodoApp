import React, { useState } from 'react'

export const Todo = ({ item, onUpdate, onDelete }) => {
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




    return (
        <div className="bg-white p-3 mb-2 rounded rounded-2">
            {
                isEdit ? (
                    <form onSubmit={handleSubmit}>
                        <label className='form-label fw-bold'>Editar tarea:</label>
                        <div className="d-flex gap-2">
                            <input type="text"
                                className='form-control'
                                value={value}
                                onChange={handleChange}
                            />
                            <button className='btn btn-outline-success fw-bold' onClick={handleClickUpdateTodo}>Update</button>
                        </div>

                    </form>
                ) : (
                    <form className='form'>
                        <div className="d-flex gap-2 justify-content-between align-items-center">
                            <label className='form-label mt-2 text-center w-100'>
                                {item.title}
                            </label>
                            <button className='btn btn-info' onClick={() => setIsEdit(true)}>Edit</button>

                            <button className='btn btn-danger' onClick={() => onDelete(item.id)}>Delete</button>
                        </div>
                    </form>
                )
            }
        </div>
    )
}
