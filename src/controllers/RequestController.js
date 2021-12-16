const Requests = require('../models/Requests');
const User = require('../models/User');

class RequestController{

    async show(req, res){
        const {user} = req.params;

        const request_user = await Requests.find({user});

        try{
            res.status(200).json(request_user);
        }
        catch (err){
            console.log(err);
        }
    };

    async index(req, res){

        const {status} = req.params;
        const {user} = req.params;

            const request = await Requests.find({user, status});

            try{
                res.status(200).json(request);
            }
            catch (err){
                console.log(err);
            }
    }

    async store(req, res){

        const {title, type, description, date, status} = req.body;
        const {user_id} = req.headers;

        const request = await Requests.create({
            user: user_id,
            title,
            type,
            description,
            date,
            status
        })

        try{
            res.status(200).json(request);
        }
        catch (err){
            console.log(err);
        }
    }

    async destroy(req, res){
        const {request_id} = req.params;

        const request = await Requests.findByIdAndDelete({ _id: request_id });
        
        try{
            res.status(200).json({message: "Pedido deletado com sucesso"});
        }
        catch (err){
            console.log(err);
        }
    }

}

module.exports = new RequestController();