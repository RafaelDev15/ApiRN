const User = require('../models/User');
const authConfig = require('../config/auth.json');
const jwt = require('jsonwebtoken');

class UserController{

    async store(req, res){

        const {email} = req.body;

        function generationToken(params = {}){
            return jwt.sign({id: user.id}, authConfig.secret, {
                expiresIn: 86400
            } );
        }

        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({error: "Email já existe"});
        }

        const user = await User.create(req.body);

        user.password = undefined;

        try{
            return res.status(200).json({
                user,
                token: generationToken({ id: user.id })
            });
        }
        catch (err){
            console.log(err);
        }
    }
}

module.exports = new UserController();