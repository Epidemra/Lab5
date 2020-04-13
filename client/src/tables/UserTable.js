import React from 'react'

const UserTable = props => (
  <table>
    <thead>
      <tr>
        <th>Mark</th>
        <th>Model</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>      
      {props.cars.length > 0 ? (
        props.cars.map(car => (
          <tr key={car.id}>
            <td>{car.mark}</td>
            <td>{car.model}</td>
            <td>{car.year}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(car)
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deletecar(car.id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4}>No cars</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default UserTable
