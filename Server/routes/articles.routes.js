const ArticleController = require('../controllers/article.controller');
module.exports = function(app){
    app.get('/api/articles', ArticleController.getAllArticles);
    // app.get('/api/pirate/:_id', ArticleController.getPirate);
    app.post('/api/article/new', ArticleController.createArticle);
    // app.put('/api/pirate/:_id', ArticleController.updatePirate);
    app.delete('/api/article/:_id', ArticleController.deleteArticle);
}