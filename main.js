import express from 'express';
import { inMemoryBookRepository } from './book/book.repository.js';
import { BookService } from './book/book.services.js';
import { BookController } from './book/book.controller.js';

const app = express()

app.use(express.static('public'))
app.use(express.json())

const bookRepository = new inMemoryBookRepository();
const bookServices = new BookService(bookRepository);
const bookController = new BookController(bookServices)

app.use('/', bookController.router)

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})
