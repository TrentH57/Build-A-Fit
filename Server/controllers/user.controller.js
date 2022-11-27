const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



module.exports.registerUser = (req, res) => {
    User.find({email: req.body.email})
    .then(dbRes => {
        if(dbRes.length === 0){
            User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY);
                res.cookie("userToken", userToken, process.env.SECRET_KEY,{
                    httpOnly: true
                })
                .json({ msg: "success!", user: user});
            })
            .catch(err => {
                res.status(400).json(err.message);
            })
        }else{
            res.json({errors: {email: {message: "Email is already in use"}}})
        }
    })
}

module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
        // email not found in users collection
        console.log("user not found");
        return res.sendStatus(400);
    }

    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }

    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);

        // console.log(userToken);
    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, process.env.SECRET_KEY, {
            httpOnly: true
        })
        .json({ msg: "success!", user: user });
        
}

module.exports.getClearedUser = (req, res) => {
    const userInfo = jwt.decode(req.cookies.usertoken, {complete:true})
    // console.log(userInfo);
    User.findOne({_id: userInfo.payload.id})
        .then(user => {
            res.json({results: user._id})
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.getOneUser = (req, res) => {
    User.findOne({_id: req.params._id})
    .then(user => {
        res.json({results: user})
    })
    .catch(err => {
        res.json(err)
    })
}
module.exports.logOut = (req, res) => {
    res.clearCookie('userToken');
    res.sendStatus(200);
}


