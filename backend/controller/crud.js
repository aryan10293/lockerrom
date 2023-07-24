const User = require("../model/User");
const Feat = require('../model/Feat')
const cloudinary = require('../middleware/cloundinary');
module.exports = {
    addLike: async (req,res) => {
        try{
            const updateUser = await User.findOneAndUpdate(
                {_id: req.body.loginUser.userId},
                {
                    $push: { likes: req.body.dataset},
                }
            )
            //conosle.log(cool)
            const updateFeat = await Feat.findOneAndUpdate(
                {_id: req.body.dataset},
                {
                    $push: { likes: req.body.loginUser.userId },
                }
            )
            if (!updateUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (!updateFeat) {
                return res.status(404).json({ error: 'Feat not found' });
            }

            return res.status(200).json(updateUser.likes);
        } catch(err){
            console.error(err)
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    addComment: async (req,res) => {
        try{
            console.log(req.body)
            const updateComment = await Feat.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $push: { comments: req.body}
                }
            )
            if (!updateComment) {
                return res.status(404).json({ error: 'Post not found' });
            }

            return res.status(200).json(updateComment.comment);
        } catch(err){
            console.error(err)
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    unlike: async (req,res) => {
        try{
            const updateUser = await User.findOneAndUpdate(
                {_id: req.body.loginUser.userId},
                {
                    $pull: { likes: req.body.dataset},
                }
            )
            const updateFeat = await Feat.findOneAndUpdate(
                {_id: req.body.dataset},
                {
                    $pull: { likes: req.body.loginUser.userId },
                }
            )
            if (!updateUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (!updateFeat) {
                return res.status(404).json({ error: 'Feat not found' });
            }

            return res.status(200).json(updateUser.likes);
        } catch(err){
            console.error(err)
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    follow: async (req,res) => {
        try{
            const updateUser = await User.findOneAndUpdate(
                {_id: req.body.loginUser.userId},
                {
                    $push: { following: req.body.dataset},
                }
            )
            const updateUserToFollow = await User.findOneAndUpdate(
                {_id: req.body.dataset},
                {
                    $push: { followers: req.body.loginUser.userId },
                }
            )
            if (!updateUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (!updateUserToFollow) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.status(200).json(updateUser.following);
        } catch(err){
            console.error(err)
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    unfollow: async (req,res) => {
        try{
            const updateUser = await User.findOneAndUpdate(
                {_id: req.body.loginUser.userId},
                {
                    $pull: { following: req.body.dataset},
                }
            )
            const updateUserToFollow = await User.findOneAndUpdate(
                {_id: req.body.dataset},
                {
                    $pull: { followers: req.body.loginUser.userId },
                }
            )
            if (!updateUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (!updateUserToFollow) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.status(200).json(updateUser.following);
        } catch(err){
            console.error(err)
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    editProfile: async (req,res) => {
        try{
            const updateUser = await User.findOneAndUpdate(
                {_id: req.body.id},
                {
                    $set: { bio: req.body.obj.bio, userName: req.body.obj.username, websiteLink: req.body.obj.websiteLink},
                }
            )
            const updateUserFeats = await Feat.updateMany(
                {userId: req.body.id},
                {
                    $set: { userName: req.body.obj.username},
                }
            )
            const allFeats = await Feat.find()
            for (const feat of allFeats) {
                feat.comments.forEach(async x => {
                    if(x.userId === req.body.id){
                        x.userName = req.body.obj.username
                        await Feat.save()
                    }
                })
                await feat.save(); // Save the updated document
            }
             if(req.body.obj.profilePic !== undefined){
                const updateImg = await User.findOneAndUpdate(
                    {_id: req.body.id},
                    {
                        $set: { img: await cloudinary(req.body.obj.profilePic)},
                    }
                )
                const updateUserFeats = await Feat.updateMany(
                    {userId: req.body.id},
                    {
                        $set: { profileImg: await cloudinary(req.body.obj.profilePic)},
                    }
            )
            }
            if (!updateUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            const lol = await Feat.find(

            )
            return res.status(200).json(updateUser);
        } catch(err){
            console.error(err)
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}