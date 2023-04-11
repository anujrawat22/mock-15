const express = require("express");
const { connection } = require("./config/db");
var cors = require("cors");
const { UserRouter } = require("./routes/user.route");
const { authenticate } = require("./middleware/authenticate");
const { MessageRouter } = require("./routes/message.route");
const { GroupRouter } = require("./routes/group.route");
const { ContactRouter } = require("./routes/contact.route");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/user", UserRouter);

app.use("/message", authenticate, MessageRouter);

app.use("/groups", authenticate, GroupRouter);

app.use("/contacts", authenticate, ContactRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to Db");
    console.log(`Listening on PORT ${process.env.PORT}`);
  } catch (err) {
    console.log(err);
    console.log("Error connecting to Db");
  }
});
