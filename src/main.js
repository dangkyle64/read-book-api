import express from 'express';
import path from 'path';
import "dotenv/config";

import { BookRepository } from './book/book.repository.js';
import { BookService } from './book/book.services.js';
import { BookController } from './book/book.controller.js';
import { LoginController } from './auth/login.controller.js';

import databaseBook from '../infrastructure/databaseBook.js';
import DatabasePrisma from '../infrastructure/DatabasePrisma.js';
import rateLimit from 'express-rate-limit';

export function loadDatabase() {
    let database;

    const databaseType = process.env.DATABASE_TYPE || 'json';

    if (databaseType === 'prisma') {
        console.log("Loading prisma database...");
        database = new DatabasePrisma();
    } else {
        console.log("Falling back to default json database");

        const TEST_DB_PATH = process.env.TEST_JSON_DATABASE_FILEPATH;

        if (process.env.NODE_ENV === 'test') { 
            database = new databaseBook({ dbPath: TEST_DB_PATH });
        } else {
            database = new databaseBook();
        }
    }

    return database;
}

export async function createApp() {
    const app = express();

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // 100 requests per windowMs
        message: 'Too many requests, please try later.',
    });

    app.use(limiter);
    app.use(express.static('public'));
    app.use(express.json());

    let database = loadDatabase();

    await database.initialize();

    const loginController = new LoginController();
    app.use('/login', loginController.router);

    const bookRepository = new BookRepository(database);
    const bookServices = new BookService(bookRepository);
    const bookController = new BookController(bookServices);
    app.use('/books', bookController.router);
    
    return app;
}
