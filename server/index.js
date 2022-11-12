import connectToMongo from "./db.js"
import express from "express"
import userRoute from "./routes/userRoute.js"

const db=connectToMongo()
const app = express()
const port = 5000

app.use(express.json())

app.use('/api/user',userRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
