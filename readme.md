# Library Management API

A robust library management system built with Express, TypeScript, and MongoDB using Mongoose. This API allows you to manage books, track borrowing activities, and generate reports.

## Features

- **Book Management**: Create, read, update, and delete books
- **Borrowing System**: Track book borrows with due dates
- **Validation**: Strict schema validation for all operations
- **Aggregation Reports**: Generate borrowed books summaries
- **Business Logic**: Enforce availability rules and constraints

## Technologies Used

- **Backend**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose
- **Validation**: Built-in Mongoose validation
- **Error Handling**: Custom error middleware

## API Endpoints

### Book Management

| Method | Endpoint         | Description                     |
|--------|------------------|---------------------------------|
| POST   | `/api/books`     | Create a new book              |
| GET    | `/api/books`     | Get all books (with filtering) |
| GET    | `/api/books/:id` | Get a single book by ID        |
| PUT    | `/api/books/:id` | Update a book                  |
| DELETE | `/api/books/:id` | Delete a book                  |

### Borrow Management

| Method | Endpoint      | Description                      |
|--------|---------------|----------------------------------|
| POST   | `/api/borrow` | Borrow a book                    |
| GET    | `/api/borrow` | Get borrowed books summary report|

## Request/Response Examples

### Create a Book
```http
POST /api/books
Content-Type: application/json

{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "copies": 5
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

### Borrow a Book
```http
POST /api/borrow
Content-Type: application/json

{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-18T07:12:15.123Z",
    "updatedAt": "2025-06-18T07:12:15.123Z"
  }
}
```

### Borrowed Books Summary
```http
GET /api/borrow
```

**Response:**
```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

## Error Response Example
```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud instance)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/library-management-api.git
cd library-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/library
PORT=5000
```

4. Start the development server:
```bash
npm run dev
```

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
npm start
```

## Project Structure

```
src/
├── controllers/       # Route controllers
├── models/            # MongoDB models
├── routes/            # Express routes
├── utils/             # Utility functions
├── app.ts             # Express application
└── server.ts          # Server entry point
```

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request