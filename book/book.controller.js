import express from "express";

export class BookController {
    constructor(bookServices) {
        this.bookServices = bookServices
        this.router = express.Router();

        this.router.get("/:id", this.getBookById.bind(this))
    }

    async getBookById(request, response) {

        const { id } = request.params;
        const book = await this.bookServices.getBookProfile(id)

        if (!book)
            return response.status(404).json({  message: "Book not found" })

        return response.status(200).json(book);
    }
}