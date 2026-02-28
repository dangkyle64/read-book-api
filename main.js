import express from 'express';
import HomePage from './endpoints/HomePage.js'

const app = express()
const homepage = new HomePage()

app.use(express.static('public'))
app.use(express.json())

app.get('/', (request, response) => {
    get_data = homepage.get()
    console.log(get_data)
    response.send(get_data)
})

app.post('/', (request, response) => {
    const data = request.body
    console.log(`POST request data=${data}`)
    response.send('Data found.')
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})
