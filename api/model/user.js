//We will create a model for an example user, then we will try to add the user to the database'
//through the controller
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
});
module.exports = mongoose.model('User',userSchema);

