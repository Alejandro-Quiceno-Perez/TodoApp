import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoApp from './components/TodoApp'
import './App.css'

function App() {

  return (
    <>
    <h1 className='text-center my-4'>Lista de Tareas</h1>
      <TodoApp />
    </>
  )
}

export default App
