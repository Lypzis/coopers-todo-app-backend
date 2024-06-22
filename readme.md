# Coopers Todo App Backend

This project serves as the backend for a todo application, providing RESTful APIs for managing todo items and user authentication.

## Installation

To install dependencies, run:

npm install

## Environment Variables

Create a `.env` file in the root directory of your project. Add the following environment variables and replace placeholders with your specific values:

PORT=port
MONGO_URI=yourMongoURI
JWT_SECRET=yourSecret
JWT_EXPIRESIN=yourExpirationTime

## Usage

### Running in Production

To start the server in production mode:

npm start

### Running in Development

For development with hot-reloading using Nodemon:

npm run dev

## Dependencies

- **bcryptjs**: Password hashing library for secure user authentication.
- **dotenv**: Loads environment variables from a `.env` file for configuration.
- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **jsonwebtoken**: JSON Web Token (JWT) implementation for generating and verifying tokens.
- **mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.

## License

This project is licensed under the ISC License.
