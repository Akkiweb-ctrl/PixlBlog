const mongoose = require('mongoose');
const connStr= 'mongodb://localhost:27017/BlogApp/';


 const dbConnect = async()=>{
    const res =await mongoose.connect(connStr);
    // console.log(res);
}

module.exports = dbConnect;