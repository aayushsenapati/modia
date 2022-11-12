import express from "express"

const userRoute=express.Router()

userRoute.get('/',(req,res)=>{
    console.log(req.body)
    res.send("hello")
})

export default userRoute