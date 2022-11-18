const { Article } = require('../models/article.model');

module.exports.createArticle = (request, response) => {
        const { type, imgURL } = request.body;
        Article.create({
        type,
        imgURL
        })
            .then(article =>response.json(article))
            .catch(err => response.status(400).json(err));
    }

 module.exports.getAllArticles = (request, response) => {
        Article.find({})
            .then(articles => response.json(articles))
            .catch(err => response.json(err))
    }

module.exports.getArticle = (request, response) => {
    Article.findOne({_id:request.params._id})
    .then(article => response.json(article))
    .catch(err => response.json(err))
}

module.exports.updateArticle = (request, response) => {
    Article.findOneAndUpdate({_id: request.params._id}, request.body, {new:true})
        .then(updatedArticle => response.json(updatedArticle))
        .catch(err => response.json(err))
}

module.exports.deleteArticle = (request, response) => {
    Article.deleteOne({ _id: request.params._id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}