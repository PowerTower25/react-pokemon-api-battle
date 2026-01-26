import { useState } from "react";

function Form({onInputChange}) {

  const handleInputChange = (event) => {
    onInputChange(event.target.value)
  }
  return (
    <>
    <label htmlFor="cards-number">How many cards?</label>
    <input id="cards-number" type="text" onChange={handleInputChange}/>
    </>
  )
}

export default Form;