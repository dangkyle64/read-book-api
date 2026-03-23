import { describe, it, expect } from "vitest";
import { BookService } from "../../src/book/book.services.js";

describe('book.services', () => {
    it('getAllBookProfiles returns books from repository', async () => {
        const mockBooks = [{ id: "d15ecb32-8867-43ad-b867-066ee71b0cf6", bookName: 'Book1'}]
        const mockRepository = {
            get: async () => mockBooks
        };

        const service = new BookService(mockRepository);
        const result = await service.getAllBookProfiles();

        expect(result).toEqual(mockBooks);
    })

    it('returns multiple books from repository', async () => {
        const mockBooks = [
            { id: "d15ecb32-8867-43ad-b867-066ee71b0cf6", bookName: 'Book1' },
            { id: "f29cd92c-9943-4c4f-8a43-0c76e885497a", bookName: 'Book2' }
        ];
        const mockRepository = {
            get: async () => mockBooks
        };

        const service = new BookService(mockRepository);
        const result = await service.getAllBookProfiles();

        expect(result).toEqual(mockBooks);
    });

    it('getAllBookProfiles returns empty array when repository has no books', async () => {
        const mockBooks = [];
        const mockRepository = {
            get: async () => mockBooks
        };

        const service = new BookService(mockRepository);
        const result = await service.getAllBookProfiles();

        expect(result).toEqual(mockBooks);
    });

    it('getAllBookProfiles throws an error if repository fails', async () => {
        const mockRepository = {
            get: async () => { throw new Error('Repository error'); }
        };

        const service = new BookService(mockRepository);
        
        await expect(service.getAllBookProfiles()).rejects.toThrow('Repository error');
    });

    it('getAllBookProfiles handles books with unexpected fields', async () => {
        const mockBooks = [
            { id: "d15ecb32-8867-43ad-b867-066ee71b0cf6", bookName: 'Book1', unexpectedField: 'unexpected' }
        ];
        const mockRepository = {
            get: async () => mockBooks
        };

        const service = new BookService(mockRepository);
        const result = await service.getAllBookProfiles();

        expect(result).toEqual(mockBooks);
    });

    it('getBookProfile returns book from repository', async () => {
        const mockBook = [
            { id: "d15ecb32-8867-43ad-b867-066ee71b0cf6", bookName: 'Book1'}, 
            { id: "dummy_id2", bookName: 'Book2'}
        ]

        const mockRepository = {
            findById: async () => mockBook
        };

        const service = new BookService(mockRepository);
        const id = "d15ecb32-8867-43ad-b867-066ee71b0cf6"
        const result = await service.getBookProfile(id);

        expect(result).toEqual(mockBook);
    })

    it('createBookProfile creates book instance', async () => {
        const mockBookData = { bookName: 'Book1' };
        const mockCreatedBook = { ...mockBookData, id: 'new-id-string' };

        const mockRepository = {
            create: async (bookData) => {
                return mockCreatedBook;
            }
        };

        const service = new BookService(mockRepository);
        const result = await service.createBookProfile(mockBookData);

        expect(result).toEqual(mockCreatedBook);
    })

    it('createBookProfile return error on missing bookName', async () => {
        const mockInvalidBookData = {};

        const mockRepository = {
            create: async () => {}
        };

        const service = new BookService(mockRepository);

        // expect rejected promise
        await expect(service.createBookProfile(mockInvalidBookData)).rejects.toThrow('Book must have a bookName');
    })

    it('should update the book profile and return the updated book', async () => {
        const mockNewBookData = { bookName: 'Updated Book' };
        const mockUpdatedBook = { ...mockNewBookData, id: 'id-string' };

        const mockRepository = {
            update: async (newBookData) => {
                return mockUpdatedBook;
            }
        };

        const service = new BookService(mockRepository);
        const result = await service.updateBookProfile('id-string', mockNewBookData);


        expect(result).toEqual(mockUpdatedBook);
    });

    it('should throw an error if update fails', async () => {
        const mockInvalidBookData = {};
        const mockRepository = {
            update: async (newBookData) => {}
        };

        const service = new BookService(mockRepository);

        // Test that the error is thrown
        await expect(service.updateBookProfile(mockInvalidBookData)).rejects.toThrow('Update failed, bookName is invalid.');
    });

    it('should return null if no valid fields are provided', async () => {
        const mockRepository = {
            patch: async (id, data) => {
                return { id, ...data };
            }
        };

        const service = new BookService(mockRepository);

        const mockId = 'book-id';
        const newBookData = {
            title: undefined,
            author: undefined
        };

        const result = await service.patchBookProfile(mockId, newBookData);

        expect(result).toBeNull();
    });

    it('should patch only defined fields and return result', async () => {
        const mockPatchedBook = { id: 'book-id', title: 'Updated Title' };

        const mockRepository = {
            patch: async (id, data) => {
                return { id, ...data };
            }
        };

        const service = new BookService(mockRepository);

        const mockId = 'book-id';
        const newBookData = {
            title: 'Updated Title',
            author: undefined
        };

        const result = await service.patchBookProfile(mockId, newBookData);

        expect(result).toEqual(mockPatchedBook);
    });

    it('should patch multiple fields', async () => {
        const mockPatchedBook = {
            id: 'book-id',
            title: 'New Title',
            author: 'New Author'
        };

        const mockRepository = {
            patch: async (id, data) => {
                return { id, ...data };
            }
        };

        const service = new BookService(mockRepository);

        const mockId = 'book-id';
        const newBookData = {
            title: 'New Title',
            author: 'New Author'
        };

        const result = await service.patchBookProfile(mockId, newBookData);

        expect(result).toEqual(mockPatchedBook);
    });

    it('should delete the book profile and return an id object', async () => {
        const mockDeletedBook = { id: 'deleted-book-id' };

        const mockRepository = {
            delete: async (id) => {
                return mockDeletedBook;
            }
        }

        const service = new BookService(mockRepository);
        const mockId = 'to-delete-id';
        const result = await service.deleteBookProfile(mockId);

        expect(result).toEqual(mockDeletedBook);
    })

    it('should throw error if profile id to delete does not exist', async () => {
        const mockRepository = {
            delete: async (id) => {}
        }

        const service = new BookService(mockRepository);

        await expect(service.deleteBookProfile()).rejects.toThrow('Valid book ID must be provided');
    })
})