const express = require('express');
const router = express.Router();
const userController = require('../controller/users');

router.get('/',(req,res)=>{
   res.status(200).json({
       message:'Hello World'
   })
});

router.post('/',userController.AddUser);


module.exports = router;