import mongoose from "mongoose"

const {Schema}=mongoose


const userSchema =Schema(
    {
        _id:String,
        playlists:[{
            _id:false,
            playName:String,
            date:{ type: Date, default: Date.now },
            tracks:[]
        }]
    }
)

const user=mongoose.model('userSchema',userSchema,'userPlaylists')
export default user