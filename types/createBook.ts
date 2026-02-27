import { Book } from '../types/book'
import { CreateBookDTO } from '../types/dto'
import { randomUUID } from "crypto";

export function createBook(data: CreateBookDTO): Book {
    return {
        id: randomUUID(),
        book_name: data.book_name,
        chapters_read: data.chapters_read,
        favorite_chapters: data.favorite_chapters,
        thoughts: data.thoughts,
        created_at: new Date()
    }
}