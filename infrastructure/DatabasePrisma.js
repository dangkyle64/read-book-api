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
                bookName: bookData.bookName,
                lastChapterRead: bookData.lastChapterRead,
                novelUrl: bookData.novelUrl,
            }
        });

        return book;
    }

    async patch(id, newBookData) {

        const dataToUpdate = {};

        for (const key in newBookData) {
            const value = newBookData[key]

            if (value !== undefined) {
                dataToUpdate[key] = value;
            }
        }

        if (Object.keys(dataToUpdate).length === 0) {
            return null;
        };

        const updatedBook = await this.prisma.book.update({
            where: { id: id },
            data: dataToUpdate,
        });

        return updatedBook;
    }

    async delete(id) {
        await this.prisma.book.delete({
            where: { id: id },
        });

        return {id: id}
    }

    async disconnect() {
        await this.prisma.$disconnect();
    }
}

export default DatabasePrisma;

/*
Write a README snippet explaining:

Benefits of Prisma or at least why being used 

Repository depends on a database interface

Databases are swappable without modifying services/controllers

Current implementation: JSON DB

Planned future implementation: Postgres

Optionally: write a simple integration test using Postgres (or a test DB) to prove it works
*/