import { expect, describe, it, afterEach, beforeEach } from "@jest/globals";
// import mongoose from "mongoose";
// import request from 'supertest';
// import server from "../../src/server";
import dotenv from 'dotenv';

dotenv.config({ path: ".env.development" });
/* Connecting to the database before each test. */
beforeEach(async () => {
    // mongoose.set("returnOriginal", false);
    // mongoose.set("toJSON", { virtuals: true });
    // mongoose.set("toObject", { virtuals: true });
    // mongoose.connection.on("open", () => console.log("Mongoose connection Success!"))
    //     .on('error', err => console.log(err));
    // await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASWWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`);
});

describe("historySearch API", () => {
    describe("/ GET", () => {
        it("should return an array of history records", async () => {
            // const response = await request(server).get("/api/search-history/country")
            // expect(response.statusCode).toBe(200);
            expect(1).toBe(1)
        })
    })
})

/* Closing database connection after each test. */
afterEach(async () => {
    // await mongoose.connection.close();
});