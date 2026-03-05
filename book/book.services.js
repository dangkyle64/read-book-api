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

    async createBookProfile(book_data) {
        return await this.BookRepository.create(book_data)
    }

    async updateBookProfile(id, new_book_data) {
        await this.BookRepository.update(id, new_book_data)
    }

    async patchBookProfile(id, new_book_data) {
        await this.BookRepository.patch(id, new_book_data)
    }

    async deleteBookProfile(id) {
        await this.BookRepository.delete(id)
    }
}