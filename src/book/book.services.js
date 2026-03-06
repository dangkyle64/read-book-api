export class BookService {
    constructor(BookRepository) {
        this.BookRepository = BookRepository
    }

    async getAllBookProfiles() {
        return this.BookRepository.get()
    }

    async getBookProfile(id) {
        return await this.BookRepository.findById(id);
    }

    async createBookProfile(bookData) {
        return await this.BookRepository.create(bookData)
    }

    async updateBookProfile(id, newBookData) {
        await this.BookRepository.update(id, newBookData)
    }

    async patchBookProfile(id, newBookData) {
        await this.BookRepository.patch(id, newBookData)
    }

    async deleteBookProfile(id) {
        return await this.BookRepository.delete(id)
    }
}