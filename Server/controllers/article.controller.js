const { Article } = require('../models/article.model');

module.exports.createArticle = (request, response) => {
        const { type, imgURL, addedToCloset } = request.body;
        const userID = request.params.userID;
        Article.create({
        type,
        imgURL,
        userID,
        addedToCloset
        })
            .then(article =>response.json(article))
            .catch(err => response.status(400).json(err));
    }

 module.exports.getAllArticles = (request, response) => {
        Article.find({userID: request.params.userID})
            .then(articles => response.json(articles))
            .catch(err => response.json(err))
    }

module.exports.getArticle = (request, response) => {
    Article.findOne({_id: request.params.articleID})
    .then(article => response.json(article))
    .catch(err => response.json(err))
}

module.exports.updateArticle = (request, response) => {
    Article.findOneAndUpdate({_id: request.params._id}, request.body, {new:true})
        .then(updatedArticle => response.json(updatedArticle))
        .catch(err => response.json(err))
}

module.exports.deleteArticle = (request, response) => {
    Article.deleteOne({ _id: request.params.articleID })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}