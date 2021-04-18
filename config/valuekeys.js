// module.exports ={
//     MongoURI:"mongodb+srv://ushair:6QHPg7zkoPADal4n@cluster0.wpr4y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//     JWT_SECRET:"xsfd244dsafwffs"
// }

if (process.env.NODE_ENV=='production') {
    module.exports = require('./prod')
}else{
    module.exports = require('./dev')
}