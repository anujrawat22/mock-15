const { MessageModel } = require("../models/message.model")

exports.getMessages = async(req,res)=>{
    try{
        const {id} = req.params
      const {UserId} = req.body
      const messages = await MessageModel.find({senderID : UserId,recipientID : id}).sort({createdAt : -1})
      if(messages.length===0){
       return res.status(404).send({message : "No messages found"})
      }
      res.status(201).send({message : "All messages" , messages})
    }catch(err){
        console.log(err)
        res.status(500).send({Error : "Server Error"})
    }
}


exports.createMessage = async(req,res)=>{
    try{
      const {messageContent , UserId} = req.body;
      const {id} = req.params;
      const message = await new MessageModel({senderID : UserId,recipientID : id , messageContent})
      message.save()
      res.status(201).send({message : "Message posted sucessfully"})
    }catch(err){
        console.log(err)
        res.status(500).send({Error : "Server Error"})
    }
}