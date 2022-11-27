const UserController = require('../controllers/user.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = function(app){
    //User Routes
    app.get('/api/users/logout', UserController.logOut); //clears cookies
    app.post('/api/users/login', UserController.login); //checks to see if user exists and checks password and pushes the users ID to the cookie
    app.post('/api/users/register', UserController.registerUser);
    app.get('/api/users/fetchcheckeduser', UserController.getClearedUser); //used to get the user ID from the cookie to be used when fetching that users data.
    // app.get('/api/users/:_id', UserController.getOneUser);
    app.post('/api/users/new', UserController.registerUser);

}