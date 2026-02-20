// Importamos React y el hook useState
// useState nos permite manejar estado dentro de componentes funcionales
import React, { useState } from 'react'

// Importamos el componente hijo Todo
// Este componente se encargará de renderizar cada tarea individual
import { Todo } from './Todo';

// Componente principal de la aplicación de tareas
// Este componente actúa como contenedor (container component)
// porque aquí vive el estado principal de la aplicación
const TodoApp = () => {

    // ================================
    // ESTADOS DEL COMPONENTE
    // ================================

    // Estado que almacena el valor actual del input
    // Es un input controlado (controlled component)
    const [title, setTitle] = useState('');

    // Estado que almacena el array de tareas
    // Cada elemento del array será un objeto con:
    // { id, title, completed }
    const [todo, setTodo] = useState([]);

    // ==========================================
    // FUNCIÓN: handleChange
    // ==========================================
    // Se ejecuta cada vez que el usuario escribe en el input
    // Su responsabilidad es sincronizar el input con el estado
    const handleChange = (e) => {

        // Extraemos el valor actual del input
        const value = e.target.value;

        // Actualizamos el estado "title"
        // Esto provoca un re-render del componente
        setTitle(value);
    }

    // ==========================================
    // FUNCIÓN: handleSubmit
    // ==========================================
    // Se ejecuta cuando el usuario envía el formulario
    // Su responsabilidad es crear una nueva tarea
    const handleSubmit = (e) => {

        // Evita que el formulario recargue la página
        e.preventDefault();

        // Creamos un nuevo objeto tarea
        // Date.now() genera un id único basado en timestamp
        const newTodo = {
            id: Date.now(),
            title: title,
            completed: false
        }

        // Creamos una copia del array actual
        // El spread operator evita modificar el estado directamente
        const oldTodos = [...todo];

        // Agregamos la nueva tarea al inicio del array
        // unshift inserta el elemento en la primera posición
        oldTodos.unshift(newTodo);

        // Actualizamos el estado con el nuevo array
        // Esto provoca que React vuelva a renderizar la lista
        setTodo(oldTodos);

        // Limpiamos el input después de crear la tarea
        setTitle("");
    }

    // ==========================================
    // FUNCIÓN: handleUpdate
    // ==========================================
    // Recibe el id de la tarea y el nuevo valor del título
    // Su responsabilidad es actualizar una tarea existente
    const handleUpdate = (id, value) => {

        // Creamos una copia superficial del array
        const temp = [...todo];

        // Buscamos el elemento que coincida con el id
        const item = temp.find((item) => item.id === id);

        // Modificamos la propiedad title del objeto encontrado
        // (Aquí hay una mutación interna del objeto)
        item.title = value;

        // Actualizamos el estado con una nueva referencia
        // para que React detecte el cambio
        setTodo([...temp]);
    }

    // ==========================================
    // FUNCIÓN: handleDelete
    // ==========================================
    // Recibe el id de la tarea a eliminar
    // Su responsabilidad es eliminar una tarea del array
    const handleDelete = (id) => {

        // filter crea un nuevo array excluyendo
        // el elemento cuyo id coincida
        const tempTodos = todo.filter((item) => item.id !== id);

        // Actualizamos el estado con el nuevo array
        setTodo([...tempTodos]);
    }

    // ==========================================
    // RENDER DEL COMPONENTE
    // ==========================================
    return (
        <div className='my-4 w-100 h-100'>

            {/* 
                FORMULARIO PARA CREAR NUEVAS TAREAS
                onSubmit ejecuta handleSubmit
            */}
            <form className='mb-3' onSubmit={handleSubmit}>

                {/* 
                    Nota: En React debería usarse htmlFor en lugar de for 
                */}
                <label htmlFor="inputTarea" className='form-label'>
                    Ingresa tu tarea aqui!
                </label>
                
                <div className="d-flex gap-2">

                    {/* 
                        Input controlado:
                        value depende del estado "title"
                        onChange sincroniza el estado
                    */}
                    <input
                        id="inputTarea"
                        className='form-control'
                        value={title}
                        onChange={handleChange}
                    />

                    {/* 
                        Botón submit
                        type="submit" ya dispara onSubmit del form,
                        el onClick aquí es redundante pero funcional
                    */}
                    <input
                        type="submit"
                        value="Crear Tarea"
                        className='btn btn-primary'
                        onClick={handleSubmit}
                    />
                </div>
            </form>

            {/* 
                LISTADO DE TAREAS
                Se recorre el array usando map
                Por cada elemento se renderiza un componente Todo
            */}
            <div className="w-100 h-100">
                {
                    todo.map((item) => (
                        <Todo
                            key={item.id} // Necesario para que React identifique cada elemento en el Virtual DOM
                            item={item}   // Pasamos el objeto completo como prop
                            onUpdate={handleUpdate} // Función para actualizar tarea
                            onDelete={handleDelete} // Función para eliminar tarea
                        />
                    ))
                }
            </div>
        </div>
    )
}

// Exportamos el componente para poder usarlo en App.js u otro archivo
export default TodoApp