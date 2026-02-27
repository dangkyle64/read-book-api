minimum requirements

API that takes 
    book name
    chapters read
    favorite chapters
    thoughts about book


API that returns
    book data

application requirements
    database to have persistent data
    test cases to confirm important functions are stable in edge cases
    
Technical Blog Note

#  Forgetting to use express.json Middleware and the problems faced

As a entry level developer, I've taken time to go back and review the creation of APIs, and in this case
I found a foggy part of the memory. I was setting up a post request at the time along with the controller,
but then I found that despite creating a proper json in the request body it was undefined. Upon looking at
the documentation for Express along with old repos, I completely forgot that the middleware express.json()
was required to use this post data.

The problem itself lead to undefined but at the time I had to verify if any other routes were the cause of
the issue. The very first thing I checked was potentially if my POST endpoint was the issue, so using Postman at the local server, I tested it by sending a response 'Data found'. This worked properly so it couldn't be the POST endpoint so I shifted gears to a different point. I wondered if the data was not properly taking the data from the request and that could be why it was returning undefined to me. After logging the request.body, I found it was also undefined so it was down this route for sure.

express.json in Express.js is the middleware used to parse incoming JSON data inside of POST requests, 
so by forgetting to add this, I instead was getting undefined in my request.body rather than the json
data I wanted to see.

The solution is more simple in this case, just adding app.use(express.json()) into my middleware section
allowed the code to work properly again and allowed me to see the data I sent through the POST request.

Example finished code here

import express from 'express'

const app = express()

app.use(express.static('public'))
app.use(express.json())

app.get('/', (request, response) => {
    res.send('Hello express')
})

app.post('/', (request, response) => {
    const data = request.body
    console.log(`POST request data=${data}`)
    response.send('Data found.')
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})