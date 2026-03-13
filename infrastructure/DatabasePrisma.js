import "dotenv/config";
import { randomUUID } from "crypto";
import { PrismaClient } from '@prisma/client';

class DatabasePrisma {

    constructor() {
        this.prisma = new PrismaClient()
    }

    async initialize() {
    
    }

    async getAll() {
        await this.prisma.book.findMany();
    }

    async getById() {
        const book = await this.prisma.book.findUnique({
            where: { bookName: ""},
        });
    }

    async create() {
        const book = await this.prisma.book.create({
            data: {
                id: randomUUID(),
                bookName: "",
                lastChapterRead: "" | "",
                novelupdatesUrl: "" | "",
            }
        });
    }

    async patch() {
        const updatedBook = await this.prisma.book.update({
            where: { bookName: ""},
            data: { bookName: ""},
        });
    }

    async delete() {
        const deletedUser = await this.prisma.user.delete({
            where: { bookName: ""},
        });
    }

    async disconnect() {
        await this.prisma.$disconnect();
    }
}

export default DatabasePrisma();

const db = new DatabasePrisma();
await db.getAll();
await db.disconnect();

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