const express = require("express");

const { getMessages, createMessage } = require("../controller/messages");


const MessageRouter = express.Router()

MessageRouter.get("/:id",getMessages)

MessageRouter.post("/create/:id",createMessage)


module.exports = {MessageRouter}