# Full stack to-do app

### Overview

This is a full stack to-do app that uses React.js as the front end and Node.js with Express.js as the backend.

The app allows users to securely sign on to create and manage various tasks.

### Front end

This app uses React.js for the front end.

The app supports user sign in and registration as well as the option to create, edit, and remove tasks.

After signing on, there is a user-friendly home page that allows users to easily view their tasks.

The app uses Bootstrap for simple and nice CSS.

For more information on React see [react](https://react.dev) 

### Back end

This app uses Node.js with Express.js for the back end.

This app also uses MongoDB with Mongoose for the database and JWT for user authentication.

The backend supports various endpoints for user and task CRUD operations.

For more information on Express see [express](https://expressjs.com) and [node](https://nodejs.org/en) 

### How to run

1. Clone this repository and change directories.

`git clone https://github.com/avillann00/digital-factory-todo.git` 
`cd digital-factory-todo` 

2. Create the database using MongoDB

`mongosh` 
`use todo` 

3. Start the back end and install its dependencies

`cd server`
`npm install` 
`npm run dev` 

4. Create a .env and define the variables

`touch .env` 
`MONGO_URI=mongodb://localhost/todo` 
`SESSION_SECRET=your-secret-key` 

5. Start the front end and install its dependencies

`cd ../client`
`npm install` 
`npm start` 

6. Go to the page in your local browser [app](https://localhost:3000) 
