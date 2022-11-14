import mongoose  from "mongoose"

const mongoURI="mongodb+srv://modia:modia_senagrao@cluster0.pgfyu4h.mongodb.net/modia?retryWrites=true&w=majority"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,(err,client)=>{
        if(err)
            console.log("Error Connecting!")
        else
        {
            console.log("Connected to MongoDb Successfully!")
        }
    })
}

export default connectToMongo