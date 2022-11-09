//import app from "./server.js";
const mongoose = require("mongoose");
require('dotenv').config();
console.log(process.env.MODIA_DB_URI)



//const port = process.env.PORT || 8000;

mongoose
    .connect(process.env.MODIA_DB_URI, {
        //   these are options to ensure that the connection is done properly
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(error);
    });
