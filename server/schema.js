const {buildSchema} = require('graphql');

module.exports = buildSchema(`
type Car {
  id: Int
  mark: String
  model: String
  year: String
}
input CarInput {
  mark: String!
  model: String!
  year: String!
}
input UpdateCarInput {
  mark: String!
  model: String!
  year: String!
}
type RootQuery {
  getCars: [Car!]!
}
type RootMutation {
  createCar(carInput: CarInput): Car
  updateCar(id: ID!, mark: String, model: String, year: String): Car
  deleteCar(id: ID!): Car
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
