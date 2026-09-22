const http = require('http');
const PORT = 3002;

const server = http.createServer((req,res)=>{
    console.log(`Request Recieved : ${req.method} ${req.url}`);


res.StatusCode = 200;
res.setHeader('Content-Type' , 'text/plain');
res.setHeader('X-powered-By' , 'Node-js');

res.end('Hello World');

})

server.listen(PORT , () => {
    console.log(`server running at http://localhost:${PORT}`);
})