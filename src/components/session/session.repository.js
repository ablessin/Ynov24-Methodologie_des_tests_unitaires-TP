import db from "../../mongo/db.js";
import {ObjectId} from "mongodb";
import Session from "./session.entities.js";

class SessionRepository {
    constructor() {
        this.collection = db.collection("session");
    }

    async getById(id) {
        const query = this.createBsonId(id);
        return Session.fromDocument(await this.collection.findOne(query));
    }


    async getSessionByUserId(userId) {
        const documents = await this.collection.find({ "userId": userId }).toArray();
        console.log('ff', documents)
        return documents.map(doc => Session.fromDocument(doc));
    }

    getAll = async () => {
        const documents = await this.collection.find({}).toArray();
        return documents.map(doc => Session.fromDocument(doc));
    };

    deleteAll = async () => await this.collection.deleteMany({});

    async create(document) {
        const res = await this.collection.insertOne(document);
        document.id = res.insertedId.toString()
        return document;
    };

    async update(document) {
        const filter = this.createBsonId(document._id);
        const updateDocument = {
            $set: {
                start: document.start,
                end: document.end,
                pause: document.pause
            }
        };
        await this.collection.updateOne(filter, updateDocument);
        return await this.getById(document._id);
    }


    async deleteById(id) {
        const query = this.createBsonId(id)
        return await this.collection.deleteOne(query);
    }

    createBsonId(id) {
        let query;
        try {
            query = {_id: new ObjectId(id)};
        } catch (err) {
            throw new Error('Invalid id');
        }
        return query;
    }
}

export default SessionRepository;
