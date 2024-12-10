User Management Application
Description
This is a React-based User Management application that allows administrators to manage users' details, such as their name, email, role, and status. Users can be added, updated, or deleted dynamically. The application also supports user role management and status toggling, providing a complete interface for managing a system's users.

UserName:admin
Password: password123
Features
View Users: A table to display all users with details like name, email, role, and status.
Add User: A modal to add new users with their details and roles.
Edit User: An option to edit the name, email, role, and status of existing users.
Delete User: A confirmation dialog for deleting users from the system.
Toggle User Status: A switch to toggle between 'active' and 'inactive' statuses.
Role Management: Ability to assign and change roles for users.
Loading State: The application dynamically loads user data with a loading effect during fetch operations.
Dependencies
To run the application, you will need the following dependencies:

React: A JavaScript library for building user interfaces.
Redux: A state management library.
React-Redux: React bindings for Redux.
Material-UI: A set of React components that implement Google's Material Design.
React Router DOM: A library for routing and navigation in React.
Axios: A promise-based HTTP client for making API requests.
Redux Toolkit: A set of tools for efficient Redux development.
React Hooks: Built-in hooks in React for state and side-effect management.
To install the dependencies, run the following command:

**npm install**
This will install the required dependencies specified in package.json.

Setup
Clone the repository:


**git clone <repository-url>**
Navigate into the project directory:

**cd <project-name>**
Install the dependencies:


**npm install**
Run the development server:


**npm start**
This will start the application on http://localhost:3000 (or the port specified in your setup).

Running the Application
To run the application:

Make sure you have the required dependencies installed using npm install.

Run the development server with:

**npm start**
After running the command, the application will be available at http://localhost:3000 in your browser.

Open your browser and navigate to http://localhost:3000 to view and interact with the User Management Application.

Usage
View Users: The user list will be displayed in a table format.
Add New User: Click on the "Add New User" button to open a modal where you can input the details of a new user.
Edit User: To edit a user, click the "Edit" button next to the user’s name. A modal will pop up with pre-filled data, allowing you to make changes.
Delete User: Click the "Delete" button next to a user's name to open a confirmation dialog. Confirm the deletion to remove the user from the system.
Toggle Status: Use the switch in the "Status" column to toggle between "Active" and "Inactive" states for each user.


Dependencies List
@mui/material - Material-UI library for UI components.
react-redux - React bindings for Redux.
react-router-dom - Routing library for React applications.
redux - State management library.
redux-toolkit - A toolset for efficient Redux development.
axios - Promise-based HTTP client for API requests.
Install all dependencies with:

**npm install @mui/material react-redux react-router-dom redux redux-toolkit axios

**

To simulate a backend, json-server is used. It will serve mock data from a JSON file (src/mock/db.json). This allows the frontend to fetch data like it would from a real API.

Steps:
Install json-server (if not installed yet): In your project folder, run the following command to install json-server:


**npm install json-server --save-dev**


Start json-server: Run the following command to start the json-server and watch the db.json file for changes:


**npx json-server --watch src/mock/db.json --port 5000**


This command will start a mock backend on http://localhost:5000. You can use this to simulate GET, POST, PUT, DELETE requests for users and roles.


Now that the mock server is running, you need to start the React development server to view your application in the browser.

Steps:
Start React App: Run the following command to start the development server for the React application:


**npm start**


This will start the React app on http://localhost:3000 (default port).
