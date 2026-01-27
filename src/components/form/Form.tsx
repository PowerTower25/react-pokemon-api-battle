import { useState } from "react";

function Form({onInputChange, handleClick, text}) {

  const handleInputChange = (event) => {
    onInputChange(event.target?.value)
  }
  return (
    <>
    <label htmlFor="cards-number">How many cards?</label>
    <input id="cards-number" type="text" onChange={handleInputChange}/>
    <button onClick={handleClick}>{text}</button>
    </>
  )
}

export default Form;