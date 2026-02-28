import express from "express";

export class BookController {
    constructor(BookServices) {
        this.BookServices = BookServices
        this.router = express.Router();

        this.router.get("/:id", this.getBookById.bind(this))
        this.router.post("/", this.saveBookData.bind(this))
        this.router.put("/:id", this.updateBookData.bind(this))
        this.router.delete("/:id", this.deleteBookById.bind(this))
    }

    async getBookById(request, response) {

        const { id } = request.params;
        const book = await this.BookServices.getBookProfile(id)

        if (!book)
            return response.status(404).json({  message: "Book not found" })

        return response.status(200).json(book);
    }

    async saveBookData(request, response) {

        const book_data = request.body;
        await this.BookServices.saveBookProfile(book_data)

        return response.status(200).json({ message: "Book saved" })
    }

    async updateBookData(request, response) {
        const { id } = request.params;
        const book_data = request.body;
        await this.BookServices.updateBookProfile(id, book_data)

        return response.status(200).json({ message: "Book updated"})
    }

    async deleteBookById(request, response) {
        const { id } = request.params;
        const message_result = await this.BookServices.deleteBookProfile(id)

        return response.status(200).json({ message: message_result})
    }
}