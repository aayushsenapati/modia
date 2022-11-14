import express from "express"
import user from "../models/userSchema.js"

const userRoute=express.Router()

userRoute.post('/storePlay',async (req,res)=>{
    //const userDB=user(req.body)
    console.log(req.body._id)
    await user.findByIdAndUpdate(req.body._id,{$push:{playlists:req.body.playlists}},{upsert: true})
    res.send(req.body)
})

export default userRoute

