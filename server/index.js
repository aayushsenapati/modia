import app from "./server.js"
import mongodb from "mongodb"


const MongoClient=mongodb.MongoClient
const port=5000
const Db = "mongodb+srv://modia:modia_senagrao@cluster0.pgfyu4h.mongodb.net/?retryWrites=true&w=majority";


MongoClient.connect(Db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.catch(err=>{
    console.err(err.stack)
    process.exit(1)
})
.then(async client=>{
    app.listen(port,()=>{console.log(`listening on port:${port}`)})
    
})