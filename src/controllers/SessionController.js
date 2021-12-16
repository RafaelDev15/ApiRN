const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

class SessionController{
    async store(req, res){
        const {email, password} = req.body;

        const user = await User.findOne({email}).select('+password');

        function generationToken(params = {}){
            return jwt.sign({id: user.id}, authConfig.secret, {
                expiresIn: 86400
            } );
        }

        if(!user){
            return res.status(400).json({error: "Invalid email"});
        }

        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).json({error: "Invalid password"});
        }

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

module.exports = new SessionController();