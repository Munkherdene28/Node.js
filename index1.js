import express from "express";
import bp from "body-parser";
import mongoose from "mongoose";
import Url from "./schema/Url.js";
import { nanoid } from "nanoid";

const PORT = 8000;
const MONGODB_URL = 'mongodb+srv://munkherdene28:MongoDB12@cluster0.ha9qx3q.mongodb.net/?retryWrites=true&w=majority'
const app = express();
app.use(bp.json());

app.get("/", async (_, response) => {
    const res = await Url.find();
    response.send(res).end();
});

app.get("/:url", async (request, response) => {
    const { url } = request.params;

    const res = await Url.findOne({
        shortUrl: url,
    });
    response.redirect(res.longUrl);
});

app.post("/", async (request, response) => {
    const { url } = request.body;

    const newUrl = await Url.create({
        longUrl: url,
        shortUrl: nanoid(10),
    });
    response.send({ success: true, url: newUrl }).end();
});

app.delete("/:url", async (request, response) => {
    const { url } = request.params;

    const { acknowledged, deletedCount } = await Url.deleteOne({
        shortUrl: url,
    });
    response.send({ success: acknowledged, removedCount: deletedCount }).end();
});

app.listen(PORT, async () => {
    try {
        await mongoose.connect(MONGODB_URL);
    } catch (error) {
        console.log("error");
    }
    console.log(`connected to mongodb port: ${PORT}`);
});
