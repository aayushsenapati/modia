import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        "bsonType": "object",
        "properties": {

            "_id": {
                "bsonType": "objectId"
            },

            "playlists": {
                "bsonType": "array",
                "uniqueItems": true,
                "items": {
                    "bsonType": "object",
                    "properties": {
                        "playName": { "bsonType": "string" },
                        "tracks": { "bsonType": "array" },
                        "date":{"bsonType":"date","default":Date.now}
                    }
                }
            }
        }
    }
)

export default mongoose.model('userSchema',userSchema)