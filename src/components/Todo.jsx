// Importamos React y el hook useState
// useState nos permite manejar estado local dentro del componente
import React, { useState } from 'react'

// Componente funcional Todo
// Recibe tres props desde el componente padre (TodoApp):
// - item: objeto que representa una tarea
// - onUpdate: función para actualizar la tarea
// - onDelete: función para eliminar la tarea
export const Todo = ({ item, onUpdate, onDelete }) => {

    // ==========================================
    // ESTADOS LOCALES DEL COMPONENTE
    // ==========================================

    // isEdit controla si el componente está en modo edición o no
    // true  -> se muestra el formulario para editar
    // false -> se muestra la vista normal de la tarea
    const [isEdit, setIsEdit] = useState(false);

    // value almacena el valor temporal del input cuando se edita la tarea
    // Se inicializa con el título actual de la tarea
    // El operador ?? evita que sea undefined o null
    const [value, setValue] = useState(item.title ?? "");

    // ==========================================
    // FUNCIÓN: handleChange
    // ==========================================
    // Se ejecuta cuando el usuario escribe en el input
    // Actualiza el estado local "value"
    const handleChange = (e) => {
        setValue(e.target.value)
    }

    // ==========================================
    // FUNCIÓN: handleClickUpdateTodo
    // ==========================================
    // Se ejecuta cuando el usuario hace click en el botón "Update"
    // Llama a la función onUpdate del padre y luego sale del modo edición
    const handleClickUpdateTodo = () => {

        // Llamamos a la función enviada por props
        // Le pasamos el id de la tarea y el nuevo valor
        onUpdate(item.id, value);

        // Cambiamos el estado para salir del modo edición
        setIsEdit(false);
    }

    // ==========================================
    // FUNCIÓN: handleSubmit
    // ==========================================
    // Se ejecuta cuando se envía el formulario
    // Tiene la misma responsabilidad que handleClickUpdateTodo
    const handleSubmit = (e) => {

        // Evita que el formulario recargue la página
        e.preventDefault();

        // Llamamos a la función del padre para actualizar la tarea
        onUpdate(item.id, value)

        // Salimos del modo edición
        setIsEdit(false);
    }

    // ==========================================
    // RENDER DEL COMPONENTE
    // ==========================================
    return (
        <div className="bg-white mb-2 rounded rounded-2">

            {
                // Renderizado condicional
                // Si isEdit es true → mostramos formulario de edición
                // Si isEdit es false → mostramos vista normal
                isEdit ? (

                    // =============================
                    // MODO EDICIÓN
                    // =============================
                    <form onSubmit={handleSubmit}>
                        <label className='form-label fw-bold'>
                            Editar tarea:
                        </label>

                        <div className="d-flex gap-2">

                            {/* 
                                Input controlado:
                                value depende del estado local "value"
                            */}
                            <input
                                type="text"
                                className='form-control'
                                value={value}
                                onChange={handleChange}
                            />

                            {/* 
                                Botón para actualizar
                                También ejecuta handleClickUpdateTodo
                            */}
                            <button
                                className='btn btn-outline-success fw-bold'
                                onClick={handleClickUpdateTodo}
                            >
                                Update
                            </button>
                        </div>
                    </form>

                ) : (

                    // =============================
                    // MODO VISUALIZACIÓN NORMAL
                    // =============================
                    <form className='form'>
                        <div className="d-flex gap-2">

                            {/* 
                                Mostramos el título de la tarea
                                Viene desde props (item.title)
                            */}
                            <label className='form-label mt-2 ms-2 w-100'>
                                {item.title}
                            </label>

                            {/* 
                                Botón para activar modo edición
                                Cambia el estado isEdit a true
                            */}
                            <button
                                className='btn btn-info'
                                onClick={() => setIsEdit(true)}
                            >
                                Edit
                            </button>

                            {/* 
                                Botón para eliminar tarea
                                Llama a la función onDelete del padre
                            */}
                            <button
                                className='btn btn-danger'
                                onClick={() => onDelete(item.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </form>
                )
            }
        </div>
    )
}