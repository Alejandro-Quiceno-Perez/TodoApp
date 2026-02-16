import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoApp from './components/TodoApp'
import './App.css'

function App() {

  return (
    <div className='container bg-light p-4 mt-4 w-100 h-100 rounded rounded-5'>
    <h1 className='text-center text-primary fw-bold'>Lista de Tareas</h1>
      <TodoApp />
    </div>
  )
}

export default App
