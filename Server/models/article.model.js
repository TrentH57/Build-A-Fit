const mongoose = require('mongoose');
const ArticleSchema = new mongoose.Schema({
    type: { 
        type: String,
        required: [true, "Type is required"]
     },
    imgURL: { 
        type: String,
        required: [true, "Img is required"]
     },
     userID: {
     type: String,
     required: [true, "userID is required"]
     },
     addedToCloset:{
        type: String,
        required: [true, "addedToCloset is required"]
     }
}, { timestamps: true });
module.exports.Article = mongoose.model('Article', ArticleSchema);