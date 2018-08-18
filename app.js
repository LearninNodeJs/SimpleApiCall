const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/index');
require('dotenv').config();


/*We make a connection globally on the application to mongo..
*
*   Take note of the environment variable {process.env.MONGO_ATLAS}, replace the url with your own mongo url.
* */
mongoose.connect("mongodb+srv://admin:"+process.env.MONGO_ATLAS+"@restapi-kvyex.mongodb.net/TestDev?retryWrites=true",
    {useNewUrlParser:true},function(err){
        if(!err){
            console.log('Connected to Mongo Successfully');
        }else{
            console.log(err.message);
        }
    });
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/',userRoutes);

/**Global Error Handlers below*/
app.use((req,res,next)=>{
   const error = new Error('Not Found');
   error.status = 404;
   next(error);
});

app.use((err,req,res,next)=>{
   res.status(err.status ||500);
   res.json({
       err: {
           message: err.message
       }
   })
});
module.exports = app;