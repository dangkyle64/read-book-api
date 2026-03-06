import express from 'express';
import { BookRepository } from './book/book.repository.js';
import { BookService } from './book/book.services.js';
import { BookController } from './book/book.controller.js';
import databaseBook from '../infrastructure/databaseBook.js';

export async function createApp({ dbPath } = {}) {
    const app = express();

    app.use(express.static('public'));
    app.use(express.json());

    const database = new databaseBook({ dbPath });
    await database.initialize();

    const bookRepository = new BookRepository(database);
    const bookServices = new BookService(bookRepository);
    const bookController = new BookController(bookServices);

    app.use('/books', bookController.router);

    return app;
}
