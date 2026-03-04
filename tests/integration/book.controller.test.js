import { describe, it, expect, beforeEach } from 'vitest'
import request from 'supertest'
import app from '../../main.js' 

describe('GET /books', () => {

    it('returns all books', async () => {
        const res = await request(app).get('/')
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