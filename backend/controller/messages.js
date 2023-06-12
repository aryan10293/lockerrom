const User = require('../model/user')
const cloudinary = require('../middleware/cloundinary');
module.exports = {
    getMessages: async (req,res) => {
        try{

        return res.status(200).json(createFeat);
        } catch(err){
            console.error(err, 'lolojoj')
        }
    }
}