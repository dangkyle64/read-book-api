import { describe, it, expect } from "vitest";
import { BookService } from "../../src/book/book.services.js";

describe('book.services', () => {
    it('getAllBookProfiles returns books from repository (dummy test until DB implementation)', async () => {
        // mock since requires db to shift business logic to services
        const mockBooks = [{ id: 1, title: 'Book1'}]
        const mockRepository = {
            get: async () => mockBooks
        }

        const service = new BookService(mockRepository)
        const result = await service.getAllBookProfiles()

        expect(result).toEqual(mockBooks)
    })
})