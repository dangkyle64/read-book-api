import fs from 'fs';
import { randomUUID } from 'crypto';
import databaseInterface from "./databaseInterface.js";

class databaseBook extends databaseInterface {
    constructor() {
        super();
        this.data = {}
        this.DATABASE_PATH = "./infrastructure/jsonDatabase.json";
    }

    async initialize() {
        try {
            const rawData = fs.readFileSync(this.DATABASE_PATH);
            this.data = JSON.parse(rawData)
        } catch(error) {
            console.error("Error initializing the JSON database: ", error)
            this.data = { books: []}
            await this.save()
        }
    }

    async getAll() {
        try {
            const rawData = fs.readFileSync(this.DATABASE_PATH);
            const parsedData = JSON.parse(rawData)
            return parsedData
        } catch(error) {
            console.error("No data was found: ", error)
            return
        }
    }

    async create(book_data) {
        try {
            const object_to_save = {
                "id": randomUUID(),
                "book_name": book_data.book_name
            }

            const rawData = fs.readFileSync(this.DATABASE_PATH, 'utf-8')
            const parsedData = JSON.parse(rawData)

            parsedData.book.push(object_to_save)
            
            this.data = parsedData;
            
            await this.save()
            return object_to_save
            
        } catch(error) {
            console.error("Error creating object to the JSON database: ", error)
            return
        }
    }

    async getById(id) {
        try {
            const rawData = fs.readFileSync(this.DATABASE_PATH, 'utf-8')
            const parsedData = JSON.parse(rawData)
            const foundBook = parsedData.book.find(book => book.id === id)
            return foundBook
        } catch(error) {
            console.error("Error finding the book using ID: ", error)
            return
        }
    }

    async update(id, new_book_data) {
        try {
            let rawData = fs.readFileSync(this.DATABASE_PATH, 'utf-8')
            let parsedData = JSON.parse(rawData)
            
            const index = parsedData.book.findIndex(book => book.id === id)
            parsedData.book[index] = new_book_data

            this.data = parsedData

            await this.save()

        } catch(error) {
            console.error("Error updating the book using ID: ", error)
        }
    } 

    async patch(id, new_book_data) {
        try {
            let rawData = fs.readFileSync(this.DATABASE_PATH, 'utf-8')
            let parsedData = JSON.parse(rawData)

            const foundBook = parsedData.book.find(book => book.id === id)
            if (!foundBook) {
                console.error("Error did not find book under current id:")
                return 
            }
            
            Object.assign(foundBook, new_book_data)

            this.data = parsedData

            await this.save()

        } catch(error) {
            console.error("Error updating the book using ID: ", error)
        }
    }

    async delete(id) {
        try {
            let rawData = fs.readFileSync(this.DATABASE_PATH, 'utf-8')
            let parsedData = JSON.parse(rawData)

            const index = parsedData.book.findIndex(book => book.id === id)
            if (index !== -1) {
                console.log(`this.data=${this.data}`)
                parsedData.book.splice(index, 1)
            }
            
            this.data = parsedData
            await this.save()

        } catch(error) {
            console.error("Error deleting the book using ID: ", error)
        }
    }

    async save() {
        try { 
            const jsonData = JSON.stringify(this.data, null, 2);
            fs.writeFileSync(this.DATABASE_PATH, jsonData)
        } catch(error) {
            console.error("Error saving data to JSON database: ", error)
        }
    }
}

export default databaseBook;