export class BookService {
    constructor(BookRepository) {
        this.BookRepository = BookRepository
    }

    async getAllBookProfiles() {
        return this.BookRepository.get()
    }

    async getBookProfile(id) {
        const book = await this.BookRepository.findById(id);
        return book;
    }

    async saveBookProfile(book_data) {
        await this.BookRepository.create(book_data)
    }

    async updateBookProfile(id, book_data) {
        await this.BookRepository.update(id, book_data)
    }

    async deleteBookProfile(id) {
        await this.BookRepository.delete(id)
    }
}