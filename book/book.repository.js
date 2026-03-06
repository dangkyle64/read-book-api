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

    create(bookData) {
        return this.db.create(bookData)
    }

    update(id, newBookData) {
        return this.db.update(id, newBookData)
    }

    patch(id, newBookData) {
        return this.db.patch(id, newBookData)
    }

    delete(id) {
        return this.db.delete(id)
    }
}
    