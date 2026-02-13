import React, { useState } from 'react'

export const Todo = ({ item, onUpdate, onDelete, onComplete }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState(item.title ?? "");

    const handleChange = (e) => {
        setValue(e.target.value)
    }
    
    const handleClickUpdateTodo = () =>{
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

    const FormEdit = () => {
        
        return (
            <form className='todoUpdateForm' onSubmit={handleSubmit}>
                <input type="text" className='todoInput' onChange={handleChange} value={newValue} />
                <button className='button' onClick={handleClickUpdateTodo}>Update</button>
            </form>
        )
    }

    const TodoElement = () => {
        return (
            <div className='todoInfo'>
                {item.title}
                <button onClick={e => setIsEdit(true)}>Edit</button>
                <button onClick={(e) => onDelete}>Delete</button>
            </div>
        )
    }

    return (
        <div className="todo">
            {
                isEdit ? <FormEdit /> : <TodoElement />
            }
        </div>
    )
}
