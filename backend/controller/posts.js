const Feat = require('../model/Feat')
const User = require('../model/User')
const cloudinary = require('../middleware/cloundinary');
module.exports = {
    postFeat: async (req,res) => {
        console.log(req.body.imgUrl)
        try{
            let obj = {
                text: req.body.content,
                date: Date.now(),
                likes: [],
                reFeats: [],
                userId: req.body.loginUser.userId,
                userName: req.body.loginUser.name,
                profileImg: req.body.loginUser.img
            }
            if (req.body.imgUrl) {
                obj.img = await cloudinary(req.body.imgUrl);
            }
           const createFeat =  await Feat.create(obj)
            if (!createFeat) {
            return res.status(404).json({ error: 'Feat not posted' });
        }

        return res.status(200).json(createFeat);
        } catch(err){
            console.error(err, 'lolojoj')
        }
    },
    postImage: async (req,res) => {
        try {
            const url = await cloudinary(req.body.image);
            console.log(url)
            res.send(url);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    getFeats: async (req,res) => {
        try { 
            res.send(await Feat.find())
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    },
    getUsers: async (req,res) => {
        try { 
            res.send(await User.find())
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    },
    getUser: async (req,res) => {
        try { 
            res.send(await User.find({_id: req.params.id}))
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
    },
    getPost: async (req,res) => {
        try {
            const feat = await Feat.find({_id: req.params.id});
            res.send(feat[0]); // or do something with the user object
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    },
    getPostComments: async (req,res) => {
        try {
            const featsComments = await Feat.find({_id: req.params.id});
            res.send(featsComments); // or do something with the user object
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
}