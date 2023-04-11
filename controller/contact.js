const { ContactModel } = require("../models/contact.model");

exports.getContacts = async(req,res)=>{
    try{
      const {UserId} = req.body;
      const contacts = await ContactModel.find({UserId})
      if(contacts.length===0){
        return res.status(404).send({message : "No contacts found"})
      }
      
      res.status(201).send({message : "All contact",contacts})
    }catch(err){
        console.log(err)
        res.status(500).send({Error : "Something went wrong"})
    }
}


exports.createContact = async(req,res)=>{
    try{
     const {id} = req.params;
     const {UserId,name} = req.body;
     const user = await new ContactModel({UserId,contactID : id , contactName : name})
     user.save()
     res.status(201).send({message : "Contact created"})
    }catch(err){
        console.log(err)
        res.status(500).send({Error : "Something went wrong"})
    }
}


exports.deleteContact = async(req,res)=>{
    try{
  
        const {id} = req.params;
        const {UserId } = req.body;
        const user = await ContactModel.findOne({UserId,contactID : id})
        if(!user){
            return res.status(404).send({message : `Contact with id ${id} not found`})
        }
        await ContactModel.findOneAndDelete({contactID : id})
        res.status(201).send({message : 'Contact deleted sucessfully'})
    }catch(err){
        console.log(err)
        res.status(500).send({Error : "Something went wrong"})

    }
}