import { describe, it, expect } from "vitest";
import { BookService } from "../../src/book/book.services.js";

describe('book.services', () => {
    it('getAllBookProfiles returns books from repository', async () => {
        const mockBooks = [{ id: "d15ecb32-8867-43ad-b867-066ee71b0cf6", title: 'Book1'}]
        const mockRepository = {
            get: async () => mockBooks
        };

        const service = new BookService(mockRepository);
        const result = await service.getAllBookProfiles();

        expect(result).toEqual(mockBooks);
    })

    it('getBookProfile returns book from repository', async () => {
        const mockBook = [
            { id: "d15ecb32-8867-43ad-b867-066ee71b0cf6", title: 'Book1'}, 
            { id: "dummy_id2", title: 'Book2'}
        ]

        const mockRepository = {
            findById: async () => mockBook
        };

        const service = new BookService(mockRepository);
        const id = "d15ecb32-8867-43ad-b867-066ee71b0cf6"
        const result = await service.getBookProfile(id);

        expect(result).toEqual(mockBook);
    })
})