/*We will try to make an api post request to save user to db*/

const mongoose = require('mongoose');
const User = require('../model/user'); //Importing the user model.
const bcrypt = require('bcrypt'); //Hashing passwords.

/*Alternatively, the below function could be written as
*
        exports.AddUser = function(req,res,next){
        };
*
*
* */

exports.AddUser = (req,res,next)=>{
    User.find({email:req.body.email}).exec()
        .then(result =>{
            if(result.length>0){
                //A Similar Email Already Exists.
                return res.status(409).json({
                    message:'Email Already Exists.'
                })
            }else{
                //Email Does not exist, and therefore we can add new user.
                //Hashing the password first.
                bcrypt.hash(req.body.password,10,function(error,hash){
                   if(error){
                       return res.status(500).json({
                           message:'Error Hashing Password',
                           error:error.message
                       })
                   } else{
                       const user = new User({
                          _id:new mongoose.Types.ObjectId,
                           email:req.body.email,
                           password:hash

                       });
                       user.save()
                           .then(result =>{
                              res.status(200).json({
                                  message:'User Created Successfully',
                                  user
                              })
                           })
                           .catch(error =>{
                               res.status(500).json({
                                   message:'Error Creating User',
                                   error:error
                               })
                           });
                   }
                });
            }
        })
        .catch(error =>{
            res.status(500).json({
                message:'Error Loading User Emails.'
            })
        });
};

//The Exec functions returns a promise, {.then() .catch()....}
//It could be replaced by a function call back.