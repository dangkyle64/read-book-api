import "dotenv/config";
import { randomUUID } from "crypto";
import { PrismaClient } from '@prisma/client';

import databaseInterface from "./databaseInterface.js";

class DatabasePrisma extends databaseInterface {

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    async initialize() {
        console.log("Prisma database initialized");
    }

    async getAll() {
        return await this.prisma.book.findMany();
    }

    async getById(id) {
        const book = await this.prisma.book.findUnique({
            where: { id: id },
        });

        return book;
    }

    async create(bookData) {
        console.log('Made it to create function')
        const book = await this.prisma.book.create({
            data: {
                id: randomUUID(),
                bookName: "TestBook1",
                lastChapterRead: 100,
                novelUrl: "www.example.com",
            }
        });

        return book;
    }

    async patch() {
        const updatedBook = await this.prisma.book.update({
            where: { id: id },
            data: { bookName: ""},
        });
    }

    async delete(id) {
        const deletedBook = await this.prisma.book.delete({
            where: { id: id },
        });
    }

    async disconnect() {
        await this.prisma.$disconnect();
    }
}

export default DatabasePrisma;

/*
TODO for API / Portfolio Improvements (Tomorrow):

Sketch a PostgresDatabase class that implements databaseInterface:

Should support basic CRUD (getAll, getById, create, update, delete)

Use pg or Prisma for simple queries

Ensure it can drop in alongside the current JSON DB without changing services or controllers

Update repository to accept any database implementation:

Confirm JSON DB and Postgres DB both work with BookRepository

Write a README snippet explaining:

Repository depends on a database interface

Databases are swappable without modifying services/controllers

Current implementation: JSON DB

Planned future implementation: Postgres

Optionally: write a simple integration test using Postgres (or a test DB) to prove it works

*/