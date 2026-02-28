export class BookService {
    constructor(BookRepository) {
        this.BookRepository = BookRepository
    }

    async getBookProfile(id) {
        const book = await this.BookRepository.findById(id);
        return book;
    }
}