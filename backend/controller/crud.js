const User = require("../model/user");
const Feat = require('../model/Feat')

module.exports = {
    addLike: async (req,res) => {
        try{
            const updateUser = await User.findOneAndUpdate(
                {_id: req.body.loginUser.userId},
                {
                    $push: { likes: req.body.dataset},
                }
            )
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
    }
}