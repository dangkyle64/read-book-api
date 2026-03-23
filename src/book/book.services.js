export class BookService {
    constructor(BookRepository) {
        this.BookRepository = BookRepository;
    }

    async getAllBookProfiles() {
        const books = await this.BookRepository.get();

        if (!books) {
            return [];
        }
        return books;
    }

    async getBookProfile(id) {

        if (!id) {
            throw new Error("Book ID must be provided");
        }

        const book = await this.BookRepository.findById(id);
        if (!book) {
            throw new Error(`No book found with ID: ${id}`);
        }

        return book;
    }

    async createBookProfile(bookData) {

        if (!bookData || !bookData.bookName) {
            throw new Error('Book must have a bookName');
        }

        return await this.BookRepository.create(bookData);
    }

    async updateBookProfile(id, newBookData) {

        if (!newBookData || !newBookData.bookName) {
            throw new Error('Update failed, bookName is invalid.');
        }

        return await this.BookRepository.update(id, newBookData);
    }

    async patchBookProfile(id, newBookData) {

        const dataToUpdate = {};

        // trying to get the non-null keys from the request.body to properly patch sent values
        for (const key in newBookData) {
            const value = newBookData[key];

            if (value !== undefined) {
                dataToUpdate[key] = value;
            }
        }

        if (Object.keys(dataToUpdate).length === 0) {
            return null;
        }


        return await this.BookRepository.patch(id, dataToUpdate);
    }

    async deleteBookProfile(id) {

        if (!id) {
            throw new Error("Valid book ID must be provided");
        }
        
        return await this.BookRepository.delete(id);
    }
}