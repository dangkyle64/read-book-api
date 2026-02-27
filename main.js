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
