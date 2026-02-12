import React, { useState } from 'react'

const TodoApp = () => {

    const [title, setTitle] = useState('pablo');

    const handleSubmit = (e) => {
        e.preventDefault();
        setTitle('Elmo');
    }

    return (
        <div className='todoContainer'>

            <form action="" className='todoCreateForm'>
                <input type="text" className='todoInput' value={title} />
                <input type="submit" value="Crear Tarea" className='buttonCreate' onClick={handleSubmit} />

                
            </form>

        </div>
    )
}

export default TodoApp
