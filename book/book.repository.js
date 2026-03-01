export class inMemoryBookRepository {
    constructor() {
        this.books = [
            {"id": "1", "book_name": "book1"}, 
            {"id": "2", "book_name": "book2"},
        ]

        this.counter = 2;
    }

    async findById(id) {
        return this.books.find(book => book.id === id) || null;
    }

    async save(book_data) {
        
        console.log(book_data)
        const book_object = {
            "id": String(this.counter += 1),
            "book_name": book_data.book_name
        }

        this.books.push(book_object)
        return book_data
    }

    async update(id, book_data) {
        const book = this.books.find(book => book.id === id) || null;
        
        if (!book) {
            return null
        }

        book.book_name = book_data.book_name
        return book
    }

    async delete(id) {
        const index = this.books.findIndex(book => book.id === id);

        if (index > -1) {
            this.books.splice(index, 1)
            return { message: "Book deleted"}
        }

        return { message: "Book not found" } 
    }
}

export class BookRepository {
    constructor(db) {
        this.db = db;
    }

    get() {
        return this.db.getAll()
    }

    findById(id) {
        return this.db.getById(id)
    }

    create() {
        return this.db.create("book5")
    }
}
    