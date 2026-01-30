import { useState } from "react";
import "./Form.css";

const Form = ({onInputChange, onSelectChange, handleClick, text}) => {

  const handleInputChange = (event) => {
    onInputChange(event.target?.value)
  }

  const handleSelectChange = (event) => {
    onSelectChange(event.target.value)
  }
  return (
    <>
    <div className="form">
      <label htmlFor="cards-number">How many cards?</label>
      <input id="cards-number" type="text" onChange={handleInputChange}/>
      <label htmlFor="card-type">What is your favorite type?</label>
      <select id="card-type" onBlur={handleSelectChange}>
        <option value="">Please select a type</option>
        <option value="Colorless">Normal/Flying</option>
        <option value="Grass">Grass</option>
        <option value="Water">Water</option>
        <option value="Fire">Fire</option>
        <option value="Lightning">Lightning</option>
        <option value="Psychic">Psychic</option>
        <option value="Fighting">Fighting</option>
        <option value="Darkness">Dark</option>
        <option value="Metal">Metal</option>
        <option value="Dragon">Dragon</option>
        <option value="Fairy">Fairy</option>
      </select>
      <button onClick={handleClick}>{text}</button>
    </div>
    </>
  )
}

export default Form;