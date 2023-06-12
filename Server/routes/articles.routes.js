const ArticleController = require('../controllers/article.controller');


module.exports = function(app){
    //Article Routes
    app.get('/api/articles/:userID', ArticleController.getAllArticles);
    // app.get('/api/pirate/:_id', ArticleController.getPirate);
    app.get('/api/article/:articleID', ArticleController.getArticle)
    app.post('/api/article/new/:userID', ArticleController.createArticle);
    // app.put('/api/pirate/:_id', ArticleController.updatePirate);
    app.delete('/api/article/:articleID', ArticleController.deleteArticle);

}