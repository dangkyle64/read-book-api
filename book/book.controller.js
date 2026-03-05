import express from "express";

export class BookController {
    constructor(BookServices) {
        this.BookServices = BookServices
        this.router = express.Router();

        this.router.get("/", this.getAllBooks.bind(this))
        this.router.get("/:id", this.getBookById.bind(this))
        this.router.post("/", this.createBookData.bind(this))
        this.router.put("/:id", this.updateBookData.bind(this))
        this.router.patch("/:id", this.patchBookData.bind(this))
        this.router.delete("/:id", this.deleteBookById.bind(this))
    }

    async getAllBooks(request, response) {
        const books = await this.BookServices.getAllBookProfiles()
        if (!books) {
            return response.status(404).json({ message: "Books not found" })
        }

        return response.status(200).json(books)
    }

    async getBookById(request, response) {

        const { id } = request.params;
        const book = await this.BookServices.getBookProfile(id)

        if (!book)
            return response.status(404).json({  message: "Book not found" })

        return response.status(200).json(book);
    }

    async createBookData(request, response) {

        const book_data = request.body;

        const createdBook = await this.BookServices.createBookProfile(book_data)

        return response.status(200).json(createdBook)
    }

    async updateBookData(request, response) {
        const { id } = request.params;
        const new_book_data = request.body;
        await this.BookServices.updateBookProfile(id, new_book_data)

        return response.status(200).json({ message: "Book updated"})
    }

    async patchBookData(request, response) {
        const { id } = request.params;
        const new_book_data = request.body;
        await this.BookServices.patchBookProfile(id, new_book_data)

        return response.status(200).json({ message: "Book patched"})
    }

    async deleteBookById(request, response) {
        const { id } = request.params;
        const message_result = await this.BookServices.deleteBookProfile(id)

        return response.status(200).json({ message: `Deleted ${message_result}`})
    }
}