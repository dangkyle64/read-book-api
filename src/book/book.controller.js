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
        try {
            const books = await this.BookServices.getAllBookProfiles();
            return response.status(200).json(books);
        } catch(error) {
            if (error.message === "No books inside database.") {
                return response.status(404).json({ error: error.message });
            } else {
                return response.status(500).json({ error: error.message });
            }
        };
    }

    async getBookById(request, response) {
        const { id } = request.params;

        try {
            const book = await this.BookServices.getBookProfile(id);
            return response.status(200).json(book);
        } catch(error) {
            if (error.message === "Book profile does not exist.") {
                return response.status(404).json({ error: error.message });
            } else {
                return response.status(500).json({ error: error.message });
            }
        }
    }

    async createBookData(request, response) {

        const bookData = request.body;

        try {
            const createdBook = await this.BookServices.createBookProfile(bookData);
            return response.status(201).json(createdBook)
        } catch(error) {
            if (error.message === "Error creating book profile.") {
                return response.status(500).json({ error: error.message });
            } else {
                return response.status(500).json({ error: error.message });
            }
        }
    }

    async updateBookData(request, response) {
        const { id } = request.params;
        const newBookData = request.body;

        try {
            const updatedBook = await this.BookServices.updateBookProfile(id, newBookData);
            return response.status(200).json(updatedBook)
        } catch(error) {
            if (error.message === "Book profile does not exist.") {
                return response.status(404).json({ error: error.message });
            } else {
                return response.status(500).json({ error: error.message });
            }
        }
    }

    async patchBookData(request, response) {
        const { id } = request.params;
        const newBookData = request.body;

        try {
            const patchedBook = await this.BookServices.patchBookProfile(id, newBookData)
            return response.status(200).json(patchedBook)
        } catch(error) {
            if (error.message === "Book profile does not exist.") {
                return response.status(404).json({ error: error.message });
            } else {
                return response.status(500).json({ error: error.message });
            }
        }
    }

    async deleteBookById(request, response) {
        const { id } = request.params;
        const result = await this.BookServices.deleteBookProfile(id)

        if (result.error) {
            return response.status(404).json({ error: result.error, id: result.id })
        }

        return response.status(200).json({ message: `Book profile deleted successfully.`, id: result.id})
    }
}