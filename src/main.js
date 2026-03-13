import express from 'express';
import "dotenv/config";

import { BookRepository } from './book/book.repository.js';
import { BookService } from './book/book.services.js';
import { BookController } from './book/book.controller.js';
import databaseBook from '../infrastructure/databaseBook.js';
import DatabasePrisma from '../infrastructure/DatabasePrisma.js';

export async function createApp({ dbPath } = {}) {
    const app = express();

    app.use(express.static('public'));
    app.use(express.json());

    let database;
    if (process.env.DATABASE_TYPE === 'prisma') {
        console.log("Loading prisma database...");
        database = new DatabasePrisma();
    } else {
        // need to switch DATABASE_TYPE back to json for testing, need to fix
        console.log("Falling back to default json database");
        database = new databaseBook({ dbPath });
    }

    await database.initialize();

    const bookRepository = new BookRepository(database);
    const bookServices = new BookService(bookRepository);
    const bookController = new BookController(bookServices);

    app.use('/books', bookController.router);

    return app;
}
