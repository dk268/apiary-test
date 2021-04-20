This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Getting Started

The project lives on the tests/initial-tests branch.

npm i
npm test

# The Test

## Technologies

Jest.

## Test Philosophy

The API itself is best tested in its own environment, I think. The API code itself would be unit tested. As tests should not call API's themselves, the first task was to mock the API. Since this was a small set of endpoints to test, I simply inspected the inputs and outputs of the endpoints and created a mocking function that returns a promise to simulate the asynchronous nature of the API calls. I used a simple class to emulate the database. If this were a more involved API, a richer set of features would have been employed, such as jest.mock.

The endpoints appeared to be very simple, returning only statuses or an ID. This made mocking the responses based only on inspection a feasible option.

### The ID Generator

I used a simple 0-999 generator for the ID. I chose to go with that instead of a proper UUID function in order to reduce the overhead of this program.

## Observations

The endpoints seemed to get the job done. The bare-bones responses could be difficult to work with in a more complex setting.
I did not exhaustively test the endpoints themselves, so if there were any errors hidden there, I would not have found them.
Perhaps it was foolish to assume that the API was working correctly, and that mocking it would accomplish the task?
