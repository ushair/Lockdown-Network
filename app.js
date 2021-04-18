const express =require("express")
const app = express()
const PORT = process.env.PORT||5000
const mongoose = require("mongoose")
const {MongoURI} = require('./config/valuekeys.js')

//6QHPg7zkoPADal4n  password DB

mongoose.connect(MongoURI,
    {useNewUrlParser:true,
        useUnifiedTopology: true
    })

mongoose.connection.on('connected',()=>{
    console.log("We are connected to the Mongo Server");
})
mongoose.connection.on('error',()=>{
    console.log("We are not connected to the Mongo Server");
})

require("./models/user")
require("./models/post")

app.use(express.json())

app.use(require('./routes/authen'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if (process.env.NODE_ENV=="production") {
    app.use(express.static('client/build'))
    const path= require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("Server is Running at ",PORT);
})