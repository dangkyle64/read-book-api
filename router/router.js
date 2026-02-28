import { Router } from 'express';
import HomePage from '../endpoints/homepage.js';
import { randomUUID } from 'crypto';

const router = Router()
const homepage = new HomePage()

router.get('/', (request, response) => {
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

router.post('/', (request, response) => {
    const data = request.body
    createBookDataInstance(request.body)
    console.log(`POST request data=${data.chapters_read}`)
    response.send(homepage.post())
})

router.put('/', (request, response) => {
    response.send(homepage.update())
})

router.delete('/', (request, response) => {
    response.send(homepage.delete())
})

export default router;