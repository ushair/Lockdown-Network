const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    likes:[{
        type:ObjectId,
        ref:"User"
    }],
    comments:[{
        text:String,
        name:String,
        postedBy:{type:ObjectId,ref:"User"}
    }]
    ,
    postedby:{
        type:ObjectId,
        ref:"User"
    }
})


module.exports = mongoose.model("Post",postSchema)

