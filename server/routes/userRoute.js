import express from "express"
import user from "../models/userSchema.js"

const userRoute=express.Router()

userRoute.post('/storePlay',async (req,res)=>{
    //const userDB=user(req.body)
    console.log(req.body._id)
    await user.findByIdAndUpdate(req.body._id,{$push:{playlists:{playName:req.body.playName,tracks:req.body.tracks}}},{upsert: true})
    res.send("Store Successs")
})

userRoute.post('/getPlay',async (req,res)=>{
    //const userDB=user(req.body)
    const data=await user.find({_id:req.body._id})
    res.send(data)
})

userRoute.post('/delPlay',async (req,res)=>{
    //const userDB=user(req.body)
    const data=await user.update({_id:req.body._id})
    res.send(data)
})

export default userRoute

