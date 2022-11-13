import mongoose from "mongoose"

const {Schema}=mongoose

/* const userSchema1 = Schema(
    {
        "bsonType": "object",
        "properties": {

            "_id": {
                "bsonType": "objectId"
            },

            "playlists": {
                "bsonType": "array",
                "items": {
                    "bsonType": "object",
                    "properties": {
                        "playName": { "bsonType": "string" },
                        "tracks": { "bsonType": "array" },
                        "date":{"bsonType":"date","default":"date.now"}
                    }
                }
            }
        }
    }
) */

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