import express from 'express';
import HomePage from './endpoints/homepage.js';
import { randomUUID } from 'crypto';

const app = express()
const homepage = new HomePage()

app.use(express.static('public'))
app.use(express.json())

app.get('/', (request, response) => {
    response.send(homepage.get())
})

function createBookDataInstance(data) {
    return {
        id: randomUUID(),
        book_name: data.book_name ?? null,
        chapters_read: data.chapters_read ?? null,
        favorite_chapters: data.favorite_chapters ?? null,
        thoughts_about_book: data.thoughts_about_book ?? null,
        created_at: Date.now() ?? null,
    }
}

app.post('/', (request, response) => {
    const data = request.body
    createBookDataInstance(request.body)
    console.log(`POST request data=${data.chapters_read}`)
    response.send(homepage.post())
})

app.put('/', (request, response) => {
    response.send(homepage.update())
})

app.delete('/', (request, response) => {
    response.send(homepage.delete())
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})
