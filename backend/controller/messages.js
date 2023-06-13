const User = require('../model/user')
const cloudinary = require('../middleware/cloundinary');
module.exports = {
    getUserName: async (req,res) => {
        try{

            
        } catch(err){
            console.error(err, 'lolojoj')
        }
    },
    addMessage: async (req,res) => {
        console.log(req.body)
        try{
            let run = true
            const cool = await User.findById({_id: req.body.id})
            cool.messages.forEach(x =>  {if(x.id === req.params.id) run = false })
            if(run){
                const updateUser = await User.findOneAndUpdate(
                    {_id: req.body.id},
                    {
                        $push: { messages: {id: req.params.id, name: req.body.messagingName}},
                    }
                )
                const updateMessaging = await User.findOneAndUpdate(
                    {_id: req.params.id},
                    {
                        $push: { messages: {id:req.body.id, name: req.body.userName}},
                    }
                )
                if (!updateUser) {
                    return res.status(404).json({ error: 'User not found' });
                }
                if (!updateMessaging) {
                    return res.status(404).json({ error: 'User not found' });
                }
            } else {
                console.log('messages room already created')
            }

            //return res.status(200).json(updateUser.messages);
        } catch(err){
            console.error(err)
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
}