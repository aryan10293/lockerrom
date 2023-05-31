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
        try { 
            res.send(await Feat.find())
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    },
    getUser: async (req,res) => {
        try { 
            res.send(await User.find())
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    },
    getProfile: async (req,res) => {
        try {
            const user = await User.findById(req.params.id);
            res.send(user); // or do something with the user object
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    },
    getProfilePost: async (req,res) => {
        try {
            const feat = await Feat.find({userId: req.params.id});
            res.send(feat); // or do something with the user object
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
}