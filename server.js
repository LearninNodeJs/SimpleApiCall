const http = require('http');
const port = process.env.PORT || 3000;

const app = require('./app');
const server = http.createServer(app);

server.listen(port,function(err){
   if(!err){
       console.log('Listening on Port ' + port);
   }else{
       console.log(err.message);
   }
});