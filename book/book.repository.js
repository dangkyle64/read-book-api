export class inMemoryBookRepository {
    constructor() {
        this.books = [
            {"id": "1", "book_name": "book1"}, 
            {"id": "2", "book_name": "book2"},
        ]
    }

    async findById(id) {
        return this.books.find(book => book.id === id) || null;
    }

    async save(book) {
        this.books.push(book)
        return book
    }
}

export class BookRepository {
    constructor(db) {
        this.db = db;
    }

    findById(id) {
        return this.db.book.findUnique({ where: {id} })
    }
}