const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const BlogSchema = new Schema({
    title: { type: String, },
    // email : {type:String},
    category: { type: String },
    country: { type: String },
    authorId: { type: String },
    timestamp: { type: Date },
    description: { type: String },
    cover: { type: String }
})
const BlogModel = model('Blog', BlogSchema)
module.exports = BlogModel