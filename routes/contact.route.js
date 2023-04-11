const express = require("express")
const { getContacts, createContact } = require("../controller/contact")

const ContactRouter = express.Router()

ContactRouter.get("/",getContacts)

ContactRouter.post("/:id",createContact)


module.exports = {ContactRouter}