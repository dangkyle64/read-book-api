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
node src/server.js
```
The API will start on `https://read-book-api.onrender.com` by default.

## Project Structure

- `src/` – all application source code
  - `books/` – feature folder for the Book resource (controllers, services, routes, models)
  - `main.js` – app setup
  - `server.js` - server entry point

- `tests/` – automated tests
- `infrastructure/` – database configuration and setup
- `.gitignore`, `LICENSE`, `package.json`, `README.md` – project metadata and configuration

## Endpoints / Usage

### GET /books
**Description:**
Return all book records from the API.

**Request Example:**
```bash
curl https://read-book-api.onrender.com/books
```

**Response Example:**
```json
{
  "books": [
    { "id": "1b00401d-2317-483f-b8de-b5230c107c88", "bookName": "book1" },
    { "id": "4eb99821-78eb-483b-90d0-8d4fa7197945", "bookName": "book2" }
  ]
}
```

### POST /books
**Description**
Creates a new book record in API

**Request Example:**
```bash
curl -X POST https://read-book-api.onrender.com/books \
  -H "Content-Type: application/json" \
  -d '{
    "bookName": "The Great Gatsby"
  }'
```

**Response Example:**
```json
{
    "id":"bfdaf2cc-7c4a-4040-a49a-1d8f9edfef44",
    "bookName":"The Great Gatsby"
}
```

### PUT /books/:id
**Description**
Replace an existing book record with new data. The book’s id is immutable and will not change.

**Request Example:**
```bash
curl -X PUT https://read-book-api.onrender.com/books/5b6d5cc3-c6ae-4495-9dd8-1ec60ec1a0ec \
-H "Content-Type: application/json" \
-d '{
  "bookName": "bookNameUpdated"
}'
```

**Response Example:**
```json
{
  "bookName": "bookNameUpdated",
  "id": "5b6d5cc3-c6ae-4495-9dd8-1ec60ec1a0ec"
}
```

### DELETE /books/:id
**Description**
Deletes a book record with the specified id

**Request Example:**
```bash
curl -X DELETE https://read-book-api.onrender.com/books/1b00401d-2317-483f-b8de-b5230c107c88
```

**Response Example:**
```json
{
    "message": "Book profile deleted successfully.",
    "id": "4eb99821-78eb-483b-90d0-8d4fa7197945"
}
```

## Testing
**Note:** Basic integration test for API get endpoint have been added. Unit tests are service function related and are currently mocked. Integration tests related to database is planned for future addition.

Run the tests with:
```bash
npm test
```

## Architecture Overview
The project follows the layered structure:

Controller/Routes -> Services -> Repository -> Database (PostgreSQL with Prisma OR JSON storage)

This separation helps isolate responsibilities between request handling, business logic, and data persistence. By integrating Prisma with PostgreSQL, we improve data scalability, reliability, and enable more complex queries compared to JSON-based storage. The JSON-based storage is still implemented to allow easy swapping at the environment variable level.

## Design Decisions
### Choice of Database (PostgreSQL with Prisma OR JSON Storage)
- PostgreSQL with Prisma was chosen to provide a scalable, production-ready solution for data persistence, allowing for more complex queries and better performance in production environments.
- Prisma ORM is used to simplify interactions with PostgreSQL, offering type-safe queries and migrations, and reducing the risk of SQL injection.
- JSON-based storage is still implemented for flexibility and simplicity, allowing for easy swapping between databases depending on the environment (e.g., development or testing environments).
- This hybrid approach makes it easy to switch between PostgreSQL for production and JSON storage for testing or local development by modifying environment variables.

### Why Patch and Put
- PATCH used for partial updates to avoid overwriting fields not being modified.
- PUT replaces the entire resource and may be useful when a full update is intended.
- Supporting both methods provides flexibility depending on how the API evolves, and these HTTP methods work well with both JSON and relational databases like PostgreSQL.

### Separate Data Layer
- Data access logic is separated from route functions to improve maintainability.
- The structure allows easy swapping of the data storage layer from JSON storage to PostgreSQL (using Prisma ORM) by simply changing environment settings and modifying database configurations.
- Keeps API routes focused on request/response management rather than data management.

### Handling Errors in the API
- At early stages, errors are handled directly in the controller for simplicity.
- Errors related to the database (whether with PostgreSQL or JSON storage) are handled within the service/repository layers and communicated back to the controller with proper status codes and messages.
- This approach keeps things simple now, while making it easy to refactor into centralized middleware later.

### Rate Limiting
- express-rate-limit was chosen to handle rate limiting due to its simplicity and ease of integration with Express-based APIs.
- The limiter provides basic per-IP request limiting which protects the API from abuse and excessive requests.
- As the API scales, more sophisticated rate limiting (e.g., per endpoint or user-based limits) could be introduced, and this can be adapted for both PostgreSQL and JSON-based storage.

### Authentication Approach
- A basic token-based authentication system was implemented using in-memory storage instead of JWT.
- This was done to understand how tokens are created, stored, and validated through middleware in Express.js.
- This approach is simple and works well for development but is not suitable for production.

## Future Work

**1. Testing Enhancements**
- Add more comprehensive integration tests for all endpoints to ensure the API works with the real database (PostgreSQL) as expected.
- Add edge case and error handling tests for different HTTP scenarios (e.g., 400, 404, 500) to ensure the API handles all cases robustly, particularly when interacting with a relational database.
- Increase unit test coverage in the service layer, especially as business logic grows more complex, and ensure it’s database-agnostic (works with both JSON and PostgreSQL).
- Integrate test coverage reporting into the CI pipeline for better monitoring and insight.

**2. Rate limiting**
- Refine limits per endpoint as the API scales.
- Consider implementing more advanced rate-limiting like user authentication-based limits or different limits per role

**3. Implement automated testing (CI)**
- Set up continous integration using Github Actions.
- Integrate code linting and static analysis tools in the CI pipeline to enforce coding standards and improve code quality.

**4. Configure safe deployment workflow (CD)**
- Configure automated deployment pipeline for secure and reliable releases.
- Add rollback mechanisms to the CD pipeline to safely revert to a stable version in case of issues during deployment.

**5. Centralized Error-Handling Middleware**
- Move to centralized error-handling middleware to manage HTTP status codes and messages consistently.
- Ensure that the middleware handles database errors gracefully (e.g., unique constraint violations, connection issues) when using PostgreSQL with Prisma.
- This change would help with consistency in error responses and make error handling more maintainable.

**6. User Interaction**
- Add a frontend interface to provide a user-friendly way to interact with the API (currently tested via Postman/curl).
- Provide real-time updates or notifications in the UI when interacting with the API (e.g., new book added, updated information).

**7. Real Database Integration**
- Prepare for scalability by implementing concurrency handling (e.g., optimistic locking, transactions) in PostgreSQL, especially if the application expects multiple users modifying data at the same time.

**8. Authentication & Authorization**
- Replace the current system with JWT-based authentication for better scalability and security.
- Protect sensitive routes so only authorized users can modify data.
- Support future frontend integration with login/signup flow.
- Add a login and signup system that issues tokens upon successful authentication.
- Return appropriate HTTP status codes (401 Unauthorized, 403 Forbidden) for authentication and authorization failures.

**9. Enhance Prisma ORM Features**
- Add filtering and sorting capabilities to improve the API’s ability to handle large datasets. Use Prisma's built-in query filters to support dynamic queries.
- Implement upsert operations (update if the resource exists, create if not) using Prisma’s upsert feature, which allows for atomic updates and insertions.

--- 
For deeper look into my design thinking, implementation ideas, or potential improvements, see [project blog](https://dangkyle64.github.io/).

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome. Please open a pull request or submit an issue for suggestions.

## Author / Contact
**Kyle Dang** – [GitHub](https://github.com/dangkyle64) | [Portfolio / Blog](https://dangkyle64.github.io/) | `dangkyle64@gmail.com`