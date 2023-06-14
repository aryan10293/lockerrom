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
                        $push: { messages: {id: req.params.id, name: req.body.messagingName, messages: []}},
                    }
                )
                const updateMessaging = await User.findOneAndUpdate(
                    {_id: req.params.id},
                    {
                        $push: { messages: {id:req.body.id, name: req.body.userName, messages: []}},
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
    sendMessage: async (req,res) => {
        try{
            let index1;
            let index2;
            const sender = await User.findById({_id: req.body.sender.id})
            const receiver = await User.findById({_id: req.body.receiver.id})
            sender.messages.forEach((x,i) =>  {if(x.id === req.body.receiver.id) index1 = i })
            receiver.messages.forEach((x,i) =>  {if(x.id === req.body.sender.id) index2 = i })
            const updateSender = await User.findOneAndUpdate(
                {_id: req.body.sender.id},
                {
                    $push: { [`messages.${index1}.messages`]: [{message: req.body.message, user: {id: req.body.sender.id, name: req.body.sender.name}, receiver: {id: req.body.receiver.id, name: req.body.receiver.name}}]},
                },
                 { new: true }
            )
            const updateReciver = await User.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $push: { [`messages.${index2}.messages`]: [{message: req.body.message, receiver: {id: req.body.sender.id, name: req.body.sender.name}, user: {id: req.body.receiver.id, name: req.body.receiver.name}}]},
                }
            )
            if (!updateSender) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (!updateReciver) {
                return res.status(404).json({ error: 'User not found' });
            }

            //return res.status(200).json(updateUser.messages);
        } catch(err){
            console.error(err)
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
}