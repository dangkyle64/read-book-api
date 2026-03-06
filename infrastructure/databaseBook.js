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

        let parsedData;

        try {
            const rawData = fs.readFileSync(this.DATABASE_PATH);
            parsedData = JSON.parse(rawData)
            
        } catch(error) {
            console.error("Error reading or parsing database: ", error);
            throw new Error("Failed to read database.");
        }

        if (!parsedData.book || parsedData.book.length === 0) {
            throw new Error("No books inside database."); // manually throw
        }

        return parsedData;
    }

    async getById(id) {

        let parsedData;

        try {
            const rawData = fs.readFileSync(this.DATABASE_PATH, 'utf-8');
            parsedData = JSON.parse(rawData);
        
        } catch(error) {
            console.error(`Error reading database: `, error);
            throw new Error("Failed to read the database.");
        }

        const foundBook = parsedData.book.find(book => book.id === id);
        
        if (!foundBook) {
            throw new Error("Book profile does not exist.");
        }

        return foundBook;
    }

    async create(bookData) {

        if (!bookData.bookName) {
            throw new Error("bookName is required");
        }

        const tempObject = {
            "id": randomUUID(),
            "bookName": bookData.bookName
        };

        let parsedData;

        try {
            const rawData = fs.readFileSync(this.DATABASE_PATH, 'utf-8');
            parsedData = JSON.parse(rawData);
        } catch(error) {
            console.error(`Error reading database: `, error);
            throw new Error("Failed to read the database.");
        }

        parsedData.book.push(tempObject);
        
        this.data = parsedData;
        await this.save();
        return tempObject;
    }

    async update(id, newBookData) {

        let parsedData;

        try {
            let rawData = fs.readFileSync(this.DATABASE_PATH, 'utf-8');
            parsedData = JSON.parse(rawData);
        } catch(error) {
            console.error("Error reading or parsing database: ", error);
            throw new Error("Failed to read database.");
        }

        const index = parsedData.book.findIndex(book => book.id === id);

        if (index === -1)  {
            throw new Error("Book profile does not exist.");
        }

        parsedData.book[index] = {
            ...newBookData,
            id: parsedData.book[index].id
        };

        this.data = parsedData;
            
        await this.save();
        return parsedData.book[index];
    } 

    async patch(id, newBookData) {

        let parsedData;

        try {
            let rawData = fs.readFileSync(this.DATABASE_PATH, 'utf-8');
            parsedData = JSON.parse(rawData);
        
        } catch(error) {
            console.error("Error reading or parsing database: ", error);
            throw new Error("Failed to read database.");
        }
        
        const foundBook = parsedData.book.find(book => book.id === id);
        if (!foundBook) {
            throw new Error("Book profile does not exist.");
        }
            
        Object.assign(foundBook, newBookData);

        this.data = parsedData;

        await this.save();

        return foundBook;
    }

    async delete(id) {

        let parsedData;

        try {
            let rawData = fs.readFileSync(this.DATABASE_PATH, 'utf-8')
            parsedData = JSON.parse(rawData)
        } catch(error) {
            console.error("Error reading or parsing database: ", error);
            throw new Error("Failed to read database.");
        }
            
        const index = parsedData.book.findIndex(book => book.id === id)
        if (index === -1) {
            throw new Error("Book profile does not exist.")
        }

        parsedData.book.splice(index, 1)
 
        this.data = parsedData
        await this.save()
        return {id: id}
    }

    async save() {
        try { 
            const jsonData = JSON.stringify(this.data, null, 2);
            fs.writeFileSync(this.DATABASE_PATH, jsonData);
        } catch(error) {
            console.error("Error saving data to JSON database: ", error);
            throw new Error("Error saving data to JSON database.");
        }
    }
}

export default databaseBook;