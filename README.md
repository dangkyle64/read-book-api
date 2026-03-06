![License](https://img.shields.io/badge/License-MIT-green)

# Read Book API

A RESTful API for managing and tracking books, including metadata such as title, author, and completion status. 

The project demonstrates layered API architecture with controllers, services, and a repository pattern backed by a lightweight JSON datastore.
## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Tech Stack:
- Node.js / Express
- JSON file storage
- RESTful API design

### Features:
- Track books read
- Add, edit, delete book records
- View book metadata (title, author)

### Installation
**1. Clone the repository:**
```bash
git clone https://github.com/dangkyle64/read-book-api.git
```
**2. Navigate into the project folder:**
```bash
cd read-book-api
```
**3. Install dependencies:**
```bash
npm install
```
**4. Start the API:**
```bash
node main.js
```
The API will start on `http://localhost:3000` by default.

## Project Structure

- `src/` – all application source code
  - `books/` – feature folder for the Book resource (controllers, services, routes, models)
  - `main.js` – app setup and server entry point

- `tests/` – automated tests
- `infrastructure/` – database configuration and setup
- `.gitignore`, `LICENSE`, `package.json`, `README.md` – project metadata and configuration

## Endpoints / Usage

### GET /books
**Description:**
Return all book records from the API.

**Request Example:**
```bash
curl http://localhost:3000/books
```

**Response Example:**
```json
{
  "books": [
    { "id": "1b00401d-2317-483f-b8de-b5230c107c88", "book_name": "book1" },
    { "id": "4eb99821-78eb-483b-90d0-8d4fa7197945", "book_name": "book2" }
  ]
}
```

### POST /books
**Description**
Creates a new book record in API

**Request Example:**
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "book_name": "The Great Gatsby"
  }'
```

**Response Example:**
```json
{
    "id":"bfdaf2cc-7c4a-4040-a49a-1d8f9edfef44",
    "book_name":"The Great Gatsby"
}
```

### DELETE /books/:id
**Description**
Deletes a book record with the specified id

**Request Example:**
```bash
curl -X DELETE http://localhost:3000/books/1b00401d-2317-483f-b8de-b5230c107c88
```

**Response Example:**
```json
{
    "message": "Book profile deleted successfully.",
    "id": "4eb99821-78eb-483b-90d0-8d4fa7197945"
}
```

## Testing
**Note:** Basic integration test for API get endpoint have been added. Unit tests are service function related and are currently mocked until DB integration.

Run the tests with:
```bash
npm test
```

## Architecture Overview
The project follows the layered structure:

Controller/Routes -> Services -> Repository -> JSON Storage

This separation helps isolate responsibilities between request handling, business logic, and data persistence.

## Design Decisions
### Choice of JSON Database
- JSON-based storage was chosen to keep project lightweight and simple to implement at the beginning.
- Removes the need for external database configuration while allowing for testing along CRUD operations.
- Keeps focus on API design and application logic.

### Why Patch and Put
- PATCH used for partial updates to avoid overwriting fields not being modified.
- PUT replaces the entire resource and may be useful when a full update is intended.
- Supporting both methods provides flexibility depending on how the API evolves.

### Separate Data Layer
- Data access logic is separated from route functions to improve maintainability.
- Structure makes it easier to completely replace the JSON database for a different database (eg. PostgreSQL).
- Keeps API routes focused on request/response management rather than data management.

## Future Work

**1. Testing Enhancements**
- Add more comprehensive integration tests for all endpoints.
- Add edge case and error handling tests (400, 404, 500 scenarios).
- Increase service-layer unit test coverage as business logic grows.
- Introduce test coverage reporting.

**2. Rate limiting**
- Implement basic per-IP limits to prevent excessive requests.
- Refine limits per endpoint as the API scales.

**3. Implement automated testing (CI)**
- Set up continous integration using Github Actions.

**4. Configure safe deployment workflow (CD)**
- Configure automated deployment pipeline for secure and reliable releases.

--- 
For deeper look into my design thinking, implementation ideas, or potential improvements, see [project blog](https://dangkyle64.github.io/).

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome. Please open a pull request or submit an issue for suggestions.

## Author / Contact
**Kyle Dang** – [GitHub](https://github.com/dangkyle64) | [Portfolio / Blog](https://dangkyle64.github.io/) | `dangkyle64@gmail.com`