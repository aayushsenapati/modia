import connectToMongo from "./db.js"
import express from "express"
import userRoute from "./routes/userRoute.js"
import cors from "cors"

connectToMongo()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.use('/api',userRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
