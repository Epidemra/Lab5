import React, { useState } from 'react'

const AddcarForm = props => {
	const initialFormState = { id: null, mark: '', model: '', year: ''}
	const [ car, setcar ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setcar({ ...car, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!car.mark || !car.model || !car.year) return

				props.addcar(car)
				setcar(initialFormState)
			}}
		>
			<label>Mark</label>
			<input type="text" name="mark" value={car.mark} onChange={handleInputChange} />
			<label>Model</label>
			<input type="text" name="model" value={car.model} onChange={handleInputChange} />
			<label>Year</label>
			<input type="text" name="year" value={car.year} onChange={handleInputChange} />
			<button>Add new car</button>
		</form>
	)
}

export default AddcarForm
