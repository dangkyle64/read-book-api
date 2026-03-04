# Read Book API

A RESTful API for managing and tracking books, including metadata such as title, author, and completion status.
## Getting Started

### Prerequisites
- Node.js(v18+ recommended)
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

## Endpoints / Usage

### GET /
**Description:**
Return all book records from the API.

**Request Example:**
```bash
curl http://localhost:3000/
```

**Response Example:**
```json
[
  {"id": 1, "name": "Item 1"},
  {"id": 2, "name": "Item 2"}
]
```

## Testing
**Note:** Testing has not been implemented yet. This section will be updated when unit tests are added.

Run the tests with:
```bash
# Example command when tests are added
npm test
```

Example test output:

## Future Work

**1. Testing**
- Add unit testing and integration tests to confirm endpoint stability.

**2. Rate limiting either on API / Per Endpoint basis**
- Implement basic per-IP limits to prevent excessive requests.
- Refine limits per endpoint as the API scales.

**3. Implement automated testing (CI)**
- Set up continous integration using Github Actions.

**4. Configure safe deployment workflow (CD)**
- Configure automated deployment pipeline for secure and reliable releases.

--- 
For deeper look into my design thinking, implementation ideas, or potential improvements, see [project blog](https://dangkyle64.github.io/)
  
Technical Blog Note

#  Forgetting to use express.json Middleware and the problems faced

## Intro
While building a POST endpoint in Express.js, I noticed request.body returned undefined even though proper JSON was being sent through Postman. Toward the end, I realized the middleware express.json() was not included which was causing the issue.

## Problem
The problem itself lead to undefined but at the time I had to verify if any other routes were the cause of
the issue. The very first thing I checked was potentially if my POST endpoint was the issue, so using Postman at the local server, I tested it by sending a response 'Data found'. This worked properly so it couldn't be the POST endpoint so I shifted gears to a different point. I wondered if the data was not properly taking the data from the request and that could be why it was returning undefined to me. After logging the request.body, I found it was also undefined so it was down this route for sure.

## Background / Solution background
Express.json in Express.js is the middleware used to parse incoming JSON data inside of POST requests, 
so by forgetting to add this, I instead was getting undefined in my request.body rather than the json
data I wanted to see.

## Solution
The solution is more simple in this case, just adding app.use(express.json()) into my middleware section
allowed the code to work properly again and allowed me to see the data I sent through the POST request.

Example finished code here

```bash

import express from 'express'

const app = express()

app.use(express.static('public'))

// Middleware to parse JSON bodies
app.use(express.json())

app.get('/', (request, response) => {
    res.send('Hello express')
})

app.post('/', (request, response) => {
    const data = request.body
    console.log(`POST request data=${data}`) // Now logs the JSON data correctly
    response.send('Data found.')
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})
```

# Different API implementation structures, a further look

## Intro
When working on APIs, the typical structure I've been exposed to is the structure of database module > 
services module > router. This is the most typical structure I've learned due to its ease of keeping the
different modules separate from each other for some reasons. The modules being separate allows for easier
fixing of the code without influencing other modules, centralizing the bug fixing scope. By separating out
the different structure points, it allows for easier unit testing at the modular level. However, researching on structures typically used inside APIs have shown different examples which may change based on the range the project fits in.

## Background
So when it comes to structures I've found that are also typically used, it comes at 3 levels. The beginning or initial level often follows the structure noted above as it covers most of the basic requirements. The requirements basically consistent of keeping the modules separated enough to give
flexibility when it comes to testing and centralizing implementations in their own responsibilities.

In medium sized APIs, simple dependency injection containers seem to be used further, with some frameworks
having either built in libraries or third party libraries to do this job. This is a shift from using the main file to directly pass the different modules as arguments and instead using more developed libraries to interact with this system.

NextJS - built in DI
Node - tsyringe, inversift
.NET - built in DI container
Spring Boot - depdency injection by default.

In large or enterprise APIs, there appears two structures that appear  most often and that's the Clean Architecture or Hexagonal Architecture. The difference relies mainly on whether the developer wants to have the architecture go similar to below. This method shown below is a basic example of the Hexagonal Architecture, with the basic business logic in the center, and "external" modules will be plugged in through the outside. The different "port" levels will allow for adapters to be replaced at any time without influencing business logic.

Modules -> Main -> Output 

Using this method, all modules can be worked on separately and do their specific task. Then main would be able to take the data, do work with this, and then output the data to any downstream processes. Another Structure is the Clean Archtitecture where it focuses on dependencies pointing inward. In this case, the file structure would be better suited to display this.

domain/ business rules
application/ use cases
infrastructure/ DB, external APIs
interfaces/ HTTP, GraphQL, CLI

The key for this structure is it allows swapping the DB and framework very easily as each of the dependencies are in its own section. With each dependency in its own section, it allows for more teams
to work on their own required portion of the API without influencing another team (assuming at an enterprise level).

## Solution

In this case, there is no real "problem" to solve but this was a further look into some of the structures that are possible into APIs. To me, this is more a roadmap that different developers can take when developing their API based on the LEVEL they wish to start at. Often building small minimum viable products is best so starting with the beginning database > services > router is a good idea and then scaling it up when required. However, this is assuming that time is infinite for developers and when it comes to higher level or the workplace, this can change drastically.

# API Beginning Structure and misunderstanding

# Intro
So to first give the start, the structure:

database > services > router

This was based on my current knowledge, that it should be split up to allow for easier testing and for implementation of new features centralized around the file. If adjusting something inside of the services module, it will not influence the router or database directly assuming it is completely modular. However, there is a problem with the order of my understanding.

# Problem
The current problem is my structure assumes that the database is the start, but that means it will know everything about everything else downstream which is incorrect. 

# Background

Databases should be focusing on connections and what database client, rather than how to fetch or save data. The database and any other modules should only know enough by itself in terms of responsibilities similar to something below

Database Layer
    Technical infrastructure, connection handling, low-level client

Repository Layer
    Feature-specific data access, DB -> domain translation, encapsulate queries

# Solution
In this case i just need to update my understanding to the structure:

services > repository > database

This allows infrastructure like the database to not depend on domain knowledge. I did not at the time completely understand the "roles" of each section. By keeping these separate, it allows for easier separation of responsibilities and also keeping it easy for test cases to focus on specific domains.

# Broken function getById, fixed

## Problem
The object that was supposed to be returned was instead undefined. The function works properly when using strings but when using numbers inside of the url, the returned value is undefined. The current path taken is:

Postman -> Controller -> Services -> Repository -> Database

## Background
The request.params ends up returning any value there as a string, causing problems with finding the value inside of the json database. The method used to find the issue was adding console.logs along the path found above to see what exactly the data was. At the time, seeing the number go down the path had me more confused but using typeof() cleared up the issue quickly.

## Solution
It is difficult to say its a solution but knowing that I plan on using the UUID function from the crypto library and that is always a string, I need to just stay consistent with it. The old data that caused problems could appear in the API in the future through user input so input validation must be added in between the API business logic and the input coming through the endpoint.