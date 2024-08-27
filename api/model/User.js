const mongoose = require('mongoose');
const {Schema,model} = mongoose;
 const UserSchema = Schema({
    email: {type:String, required:true, min:5,unique:true},
    password:{type:String, required:true, min:8},
    name:{type:String, required:true, min:3},
    // blogs : {type:Array}
}) 
const UserModel = model('User',UserSchema);

module.exports = UserModel;