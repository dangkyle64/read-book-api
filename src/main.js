import express from 'express';
import path from 'path';
import "dotenv/config";

import { BookRepository } from './book/book.repository.js';
import { BookService } from './book/book.services.js';
import { BookController } from './book/book.controller.js';
import databaseBook from '../infrastructure/databaseBook.js';
import DatabasePrisma from '../infrastructure/DatabasePrisma.js';

export function loadDatabase() {
    let database;

    const databaseType = process.env.DATABASE_TYPE || 'json';

    if (databaseType === 'prisma') {
        console.log("Loading prisma database...");
        database = new DatabasePrisma();
    } else {
        console.log("Falling back to default json database");
        
        const __dirname = path.dirname(new URL(import.meta.url).pathname);
        const TEST_DB_PATH = path.resolve(
            __dirname,
            process.env.TEST_JSON_DATABASE_FILEPATH
        );

        if (process.env.NODE_ENV === 'test') { 
            database = new databaseBook({ dbPath: TEST_DB_PATH });
        } else {
            database = new databaseBook()
        }
    }

    return database;
}

export async function createApp() {
    const app = express();

    app.use(express.static('public'));
    app.use(express.json());

    let database = loadDatabase()

    await database.initialize();

    const bookRepository = new BookRepository(database);
    const bookServices = new BookService(bookRepository);
    const bookController = new BookController(bookServices);

    app.use('/books', bookController.router);

    return app;
}
