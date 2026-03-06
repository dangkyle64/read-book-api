import express from 'express';
import { BookRepository } from './book/book.repository.js';
import { BookService } from './book/book.services.js';
import { BookController } from './book/book.controller.js';
import databaseBook from '../infrastructure/databaseBook.js';

const app = express()

app.use(express.static('public'))
app.use(express.json())

const database = new databaseBook()
await database.initialize()

const bookRepository2 = new BookRepository(database)
const bookServices = new BookService(bookRepository2);
const bookController = new BookController(bookServices)

app.use('/books', bookController.router)

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})

export default app;
