import React, { useState, Fragment } from 'react'
import AddcarForm from './forms/AddcarForm'
import EditcarForm from './forms/EditcarForm'
import UserTable from './tables/UserTable'
import Sample from './sample'
import graphqlQueries from './graphqlQueries';


let firstInit = false;

let App = () => {

	let [ carInfo, setUserInfo] = useState({isAuth : localStorage.getItem("token") != null, nick : localStorage.getItem("nick"), token : localStorage.getItem("token")});

	// Data
	let carsData = [];

	if (firstInit !== true && carInfo.isAuth){
		let requestBody = {
			query: graphqlQueries.FETCH_CARS
		};
		fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			response.json().then(data => {
				console.log(data.data);
				setcars(data.data.getCars);
			})
			firstInit = true;
		})
	}

	let initialFormState = { id: null, mark: '', model: '', year: ''};

	// Setting state
	let [ cars, setcars ] = useState(carsData);
	let [ currentcar, setCurrentcar ] = useState(initialFormState);
	let [ editing, setEditing ] = useState(false);


	// CRUD operations
	let addcar = car => {
		car.id = cars.length + 1;

		const requestBody = {
			query: graphqlQueries.CREATE_CAR,
			variables: {
			  mark: car.mark,
			  model: car.model,
			  year: car.year,
			}
		};




		fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
			  'Content-Type': 'application/json'
			}
		}).then(response => {
			response.json().then(data => {
				cars.push(data.data.createCar);
				setcars(cars.slice());
			})			
		})
	}

	let deletecar = id => {
		setEditing(false)

		const requestBody = {
			query: graphqlQueries.DELETE_CAR,
			variables: {
			  id: id
			}
		};

		fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
			  'Content-Type': 'application/json'
			}
		}).then(() => {
			let requestBody = {
				query: graphqlQueries.FETCH_CARS
			};

			fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			response.json().then(data => {
				console.log(data.data);
				setcars(data.data.getCars);
			})			
		})
		})
	}

	let updatecar = (id, updatedcar) => {
		setEditing(false);

		const requestBody = {
			query: graphqlQueries.UPDATE_CAR,
			variables: {
				id : id,
			  	mark: updatedcar.mark,
			  	model: updatedcar.model,
			  	year: updatedcar.year,
			}
		};

		fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(() => {
			let requestBody = {
				query: graphqlQueries.FETCH_CARS
			};

			fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			response.json().then(data => {
				console.log(data.data);
				setcars(data.data.getCars);
			})			
		})
		})
	}

	let editRow = car => {
		setEditing(true)

		setCurrentcar({ id: car.id, mark: car.mark, model: car.model, year: car.year })
	}

	let qw = (x) => {
		localStorage.setItem("nick", x.nick);
		localStorage.setItem("token", x.token);
		setUserInfo(x);
	}

	let OnLogOut = () => {
		localStorage.removeItem("nick");
		localStorage.removeItem("token");
		firstInit = false;
		setcars([]);
		setUserInfo({isAuth : false, nick : "", token : ""});
	}

	return (
		<div className="container">	
			

			{
				carInfo.isAuth ? 
					(<div>
						Hello, {carInfo.nick}
						<br></br>
						<button onClick={OnLogOut}> LogOut </button>
					</div>
					)
						: 
					<Sample handle={qw}/>
			}
			<h1>Cars CRUD App</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit car</h2>
							<EditcarForm
								editing={editing}
								setEditing={setEditing}
								currentcar={currentcar}
								updatecar={updatecar}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add car</h2>
							<AddcarForm addcar={addcar} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View cars</h2>
					<UserTable cars={cars} editRow={editRow} deletecar={deletecar} />
				</div>
			</div>
		</div>
	)
}

export default App
