import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FormField from './FormField'
import './App.css'

function App() {

  return (
    <>
    <div className="arena">
    <div className="arena__container">
      <h1>Welcome! It's time to battle</h1>
      <p>But first! We have a few things to take care of</p>
      <FormField/>
      </div>
      </div>
    </>
  )
}

export default App
