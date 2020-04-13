import React, { useState, useEffect } from 'react'

const EditcarForm = props => {
  const [ car, setcar ] = useState(props.currentcar)

  useEffect(
    () => {
      setcar(props.currentcar)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    setcar({ ...car, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updatecar(car.id, car)
      }}
    >
      <label>Mark</label>
      <input type="text" name="mark" value={car.mark} onChange={handleInputChange} />
      <label>Model</label>
      <input type="text" name="model" value={car.model} onChange={handleInputChange} />
      <label>Year</label>
      <input type="text" name="year" value={car.year} onChange={handleInputChange} />
      <button>Update car</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditcarForm
