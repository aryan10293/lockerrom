const Feat = require('../model/Feat')
const User = require('../model/user')
module.exports = {
    postFeat: async (req,res) => {
        console.log(req.body)
        try{
           const createFeat =  await Feat.create({
                text: req.body.content,
                date: Date.now(),
                likes: [],
                reFeats: [],
                userId: req.body.loginUser.userId,
                name: req.body.loginUser.name,
            })
            if (!createFeat) {
            return res.status(404).json({ error: 'Feat not posted' });
        }

        return res.status(200).json(createFeat);
        } catch(err){
            console.error(err)
        }
    },
    getFeats: async (req,res) => {
       res.send(await Feat.find())
    },
    getUser: async (req,res) => {
        res.send(await User.find())
    }
}