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
                        $push: { messages: {id: req.params.id, name: req.body.messagingName,roomId:req.body.roomId, messages: []}},
                    }
                )
                const updateMessaging = await User.findOneAndUpdate(
                    {_id: req.params.id},
                    {
                        $push: { messages: {id:req.body.id, name: req.body.userName,roomId:req.body.roomId, messages: []}},
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
                    $push: { [`messages.${index1}.messages`]: [{message: req.body.message, sender: true}]},
                },
            )
            console.log(req.body.sender.id)
            const updateReciver = await User.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $push: { [`messages.${index2}.messages`]: [{message: req.body.message, sender: false}]},
                }
            )
            if (!updateSender) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (!updateReciver) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.status(200).json({sneder: updateSender.messages, reciever: updateReciver.messages});
        } catch(err){
            console.error(err)
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getRoomId: async (req,res) => {
        try {
            const user = await User.findById({_id: req.params.id})
            res.send([user.messages.filter(x => x.name === req.params.name)[0].roomId, user.messages.filter(x => x.name === req.params.name)[0].messages])
        } catch (error) {
            console.error(error)
        }
    }
}