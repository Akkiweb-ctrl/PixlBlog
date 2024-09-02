const mongoose = require('mongoose');
const connStr= 'mongodb+srv://akashrananaware318:jxkOuR1H0IxPRCHI@cluster0.6rxck.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


 const dbConnect = async()=>{
    const res =await mongoose.connect(connStr);
    console.log(res);
}

module.exports = dbConnect;