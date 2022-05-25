const http = require('http');
const fs = require('fs') ; 
const server = http.createServer((req, res) => {
    // console.log( req.url, req.headers);
    const method = req.method ;  
    const urlW = req.url;
    if (urlW === '/') {
        res.write('<html>')
        res.write('<head><title>Input Node JS</title></head>');
        let html = `<body>
                        <form action="/message" method="POST">
                          <input type="text" name="message"/>
                          <input type="text" name="fullname"/>
                          <button type="submit">Send</button>
                        </form>
                    </body>`
        res.write(html);
        res.write('</html>');
        return res.end();
    }
   
    if(urlW === '/message' && method === 'POST'){
       const body = [];

       req.on('data',(chunk)=>{
           console.log(chunk) ; 
           body.push(chunk) ; 
       });

       req.on('end',()=>{
            const parseBody = Buffer.concat(body).toString() ; 
            console.log(parseBody) ;
            fs.writeFileSync('message.txt',parseBody + 
            '\n' + parseBody.split('=') + 
            '\n' + parseBody.split('=')[0] + 
            '\n' + parseBody.split('=')[1]);
       });
       res.statusCode = 302 ; 
       res.setHeader('Location','/') ; 
       return res.end();  
    }


    res.setHeader('Content-Type', 'text/html');
    const name = "Dang Duc Chinh";
    const age = 21;
    
    res.write('<html>')
    res.write('<head><title>Node jsPage</title></head>');
    let html = `<body>
                        <h1>Hello from my Node.js server!</h1>
                        <h2>This is my name : ${name} and age :${age}</h2>
                        <h3>Url request : ${urlW}</h3>
                    </body>`
    res.write(html);
    res.write('</html>');
    res.end() ; 
    
});

server.listen(3000); 