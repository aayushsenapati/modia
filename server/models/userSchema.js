import mongoose from "mongoose"

const {Schema}=mongoose


const userSchema =Schema(
    {
        _id:String,
        playlists:[{
            _id:false,
            playName:{
                type:String,
                unique:true
            },
            date:{ type: Date, default: Date.now },
            tracks:[]
        }]
    }
)

const user=mongoose.model('userSchema',userSchema,'userPlaylists')
user
export default user