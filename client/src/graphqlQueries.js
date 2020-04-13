export default {
    CREATE_CAR: `
      mutation CreateCar($mark: String!, $model: String!, $year: String!) {
        createCar(carInput: {mark: $mark, model: $model, year: $year}) {
          id
          mark
          model
          year 
        }
      }
    `,
    FETCH_CARS: `
     query {
       getCars {   
         id
         mark
         model
         year
        }     
     }
     `,
    DELETE_CAR: `
     mutation DeleteCar($id: ID!) {
       deleteCar(id: $id) {
         id   
       }
     }
   `,
    UPDATE_CAR: `
      mutation UpdateCar($id: ID!, $mark: String!, $model: String!, $year: String!) {
      updateCar(id: $id, mark: $mark, model: $model, year: $year) {
        id
        mark
        model
        year
     }
   }
  `
  };
  