const ImageModel = require("../models/image");

const handleView = async(req,res)=>{
    try{
        const {name} = req.body;
        const data = await ImageModel.find({name});
        console.log(data);
        res.status(200).json(data);
    }catch(error){
        console.log(error);
    }
}

module.exports = {handleView}