import mongoose  from "mongoose"

const mongoURI="mongodb+srv://modia:modia_senagrao@cluster0.pgfyu4h.mongodb.net/modia?retryWrites=true&w=majority"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,{useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true}
    ).then(()=>{console.log("Connected to MongoDb!!")}).catch((err)=>{console.log(err)})
}

export default connectToMongo