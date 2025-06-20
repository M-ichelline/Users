User Management REST API
This project implements a complete user management system with a Spring Boot REST API backend and a React frontend. The system allows users to create new users and retrieve existing users by ID, with proper error handling for non-existent users.

RESTful API with JSON responses
	In memory user data storage
	Auto-generated UUID for user ID
	Input validation and error handling
	JSON-based request and response
	Simple and fast to run locally
Technology stack
	Programming language : java
	Framework : Springboot
	Build tool : maven
	Java version:java17

API endpoints

POST/users
Creates a new user with a name and email.
Request Body(JSON)
{
  "name": "John Doe",
  "email": "john@example.com"
}
Response Body(JSON)
{
  "name": "John Doe",
  "email": "john@example.com"
}
Response (201 Created)
json

{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John Doe",
  "email": "john@example.com"
}
Error Response (400 Bad Request)
json
{
  "errors": {
    "name": "Name is required",
    "email": "Email should be valid"
  }
}


Frontend Features

The React frontend provides a clean, professional interface with the following features:

User Creation Form
	Input fields for name and email with validation
	Real-time feedback with success/error messages
	Form clearing after successful submission
	Display of created user details including generated UUID

User Search Functionality
	Input field for user ID
	Display of found user information with icons
	Proper error handling for non-existent users
	Clean, card-based layout



Testing Results

The application has been thoroughly tested and verified:

Backend API Tests
	POST /users - Successfully creates users with auto-generated UUIDs
	GET /users/:id - Successfully retrieves existing users
	GET /users/:id - Returns 404 for non-existent users
	CORS headers - Properly configured for cross-origin requests

Frontend Integration Tests
	User creation form - Successfully creates users via API
	User search functionality - Successfully retrieves users by ID
	Error handling - Displays appropriate error messages for 404 responses
	Success feedback - Shows user details after successful operations
	Form validation - Prevents submission with empty fields
	Responsive design - Works correctly on different screen sizes

Running the Application

Backend (Spring Boot)
mvn spring-boot:run
The backend will start on http://localhost:8080

Frontend (React)
npm run dev -- --host
The frontend will start on http://localhost:5173


- All requirements have been successfully implemented and tested:

1. Spring Boot REST API with POST /users and GET /users/:id endpoints
2. Auto-generated UUID for user identification
3. Proper JSON request/response handling
4. 404 status code for non-existent users
5. React frontend with user creation and search functionality
6. Professional UI with error handling and validation
7. Full integration testing between frontend and backend
8.  CORS configuration for cross-origin requests

The application is ready for use and demonstrates a complete, production-ready user management system with both backend API and frontend interface.


