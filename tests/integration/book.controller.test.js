import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import fs from 'fs';
import path from 'path';

import { createApp } from '../../src/main.js';

const TEST_DB_PATH = path.resolve(
	__dirname,
	'../../infrastructure/testJsonDatabase.json'
);
let app;

beforeEach(async () => {
	fs.writeFileSync(TEST_DB_PATH, JSON.stringify({ book: [] }, null, 2));

	app = await createApp({ dbPath: TEST_DB_PATH });

    await request(app)
        .post('/books')
        .send({ bookName: 'Seed Book' })
        .set('Content-Type', 'application/json');
});

describe('GET /books', () => {

    it('returns all books', async () => {
        const res = await request(app).get('/books')
        // checking for expected values in response 
        expect(res.statusCode).toBe(200)

        // access the array inside object first
        const books = res.body.book
        expect(Array.isArray(books)).toBe(true)
        
        if (res.body.length > 0) {
            expect(res.body[0]).toHaveProperty('id')
            expect(res.body[0]).toHaveProperty('title')
        }
    })
})

describe('GET /books/:id', () => {
    it('returns a single book', async () => {
        const postRes = await request(app)
            .post('/books')
            .send({ bookName: 'Single Book' })
            .set('Content-Type', 'application/json');

        const bookId = postRes.body.id;

        const res = await request(app).get(`/books/${bookId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', bookId);
        expect(res.body).toHaveProperty('bookName', 'Single Book');
    });
});

describe('PUT /books/:id', () => {
	it('updates an existing book', async () => {
		const postRes = await request(app)
			.post('/books')
			.send({ bookName: 'Book To Update' })
			.set('Content-Type', 'application/json');

		const bookId = postRes.body.id;

		const res = await request(app)
			.put(`/books/${bookId}`)
			.send({ bookName: 'Updated Book Name' })
			.set('Content-Type', 'application/json');

		expect(res.statusCode).toBe(200);
		expect(res.body.bookName).toBe('Updated Book Name');
		expect(res.body.id).toBe(bookId);
	});
});

describe('DELETE /books/:id', () => {
	it('deletes a book', async () => {
		const postRes = await request(app)
			.post('/books')
			.send({ bookName: 'Book To Delete' })
			.set('Content-Type', 'application/json');

		const bookId = postRes.body.id;

		const res = await request(app).delete(`/books/${bookId}`);
		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('message');
	});
});