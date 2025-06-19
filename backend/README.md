# User Management REST API

A simple REST API built with Java Spring Boot backend and React frontend for managing users. This project demonstrates basic CRUD operations with proper error handling and a modern web interface.

## Features

- **Backend (Spring Boot)**
  - RESTful API with JSON responses
  - In-memory data storage
  - Input validation and error handling
  - CORS support for frontend integration
  - Auto-generated UUIDs for user IDs

- **Frontend (React)**
  - Modern, responsive user interface
  - Real-time API integration
  - Form validation and error handling
  - Professional styling with Tailwind CSS and shadcn/ui components

## Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Maven** for dependency management
- **Spring Web** for REST API
- **Spring Validation** for input validation

### Frontend
- **React 18**
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons

## API Endpoints

### POST /users
Creates a new user with auto-generated ID.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response (201 Created):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Error Response (400 Bad Request):**
```json
{
  "errors": {
    "name": "Name is required",
    "email": "Email should be valid"
  }
}
```

### GET /users/:id
Retrieves a user by their ID.

**Response (200 OK):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "User not found"
}
```

### GET /users
Retrieves all users.

**Response (200 OK):**
```json
{
  "123e4567-e89b-12d3-a456-426614174000": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- Node.js 18 or higher
- npm or pnpm

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd user-management-api
   ```

2. **Build and run the Spring Boot application:**
   ```bash
   mvn clean compile
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

3. **Alternative: Run as JAR file:**
   ```bash
   mvn clean package -DskipTests
   java -jar target/user-management-api-1.0.0.jar
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd user-management-frontend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server:**
   ```bash
   pnpm run dev --host
   # or
   npm run dev -- --host
   ```

   The frontend will start on `http://localhost:5173`

## Testing the API

### Using curl

**Create a user:**
```bash
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

**Get a user by ID:**
```bash
curl http://localhost:8080/users/{user-id}
```

**Get all users:**
```bash
curl http://localhost:8080/users
```

### Using the Web Interface

1. Open `http://localhost:5173` in your browser
2. Use the "Create New User" form to add users
3. Use the "Search User by ID" section to find specific users
4. View all users in the "All Users" section
5. Refer to the "API Endpoints" section for curl examples

## Project Structure

### Backend (`user-management-api/`)
```
src/
├── main/
│   ├── java/com/example/usermanagement/
│   │   ├── UserManagementApiApplication.java
│   │   ├── controller/
│   │   │   └── UserController.java
│   │   ├── model/
│   │   │   └── User.java
│   │   └── service/
│   │       └── UserService.java
│   └── resources/
│       └── application.properties
└── test/
    └── java/com/example/usermanagement/
```

### Frontend (`user-management-frontend/`)
```
src/
├── components/
│   └── ui/          # shadcn/ui components
├── assets/          # Static assets
├── App.jsx          # Main application component
├── App.css          # Application styles
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Error Handling

The API implements comprehensive error handling:

- **400 Bad Request**: Invalid input data or missing required fields
- **404 Not Found**: User not found for the given ID
- **500 Internal Server Error**: Server-side errors

The frontend provides user-friendly error messages and handles network connectivity issues gracefully.

## CORS Configuration

The backend is configured to accept requests from any origin (`*`) for development purposes. In production, this should be restricted to specific domains.

## Development Notes

- User data is stored in memory and will be lost when the application restarts
- UUIDs are automatically generated for new users
- The frontend automatically refreshes the user list after creating new users
- All API responses are in JSON format
- Input validation is performed on both frontend and backend

## Future Enhancements

- Database integration (PostgreSQL, MySQL)
- User authentication and authorization
- User update and delete operations
- Pagination for large user lists
- Search and filtering capabilities
- Unit and integration tests
- Docker containerization
- Production deployment configuration

## License

This project is created for demonstration purposes.

