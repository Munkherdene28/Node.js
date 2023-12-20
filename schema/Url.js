import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    url: String,
});

const Url = mongoose.model('Url', UrlSchema);
export default Url;