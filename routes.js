const fs = require('fs') ; 
const requestHandler = (req, res) => {
    const urlW = req.url;
    const method = req.method;
    if (urlW === '/') {
        res.write('<html>')
        res.write(`<head>
                <title>Input Node JS</title>
                <meta charset="UTF-8" />
                </head>`);
        let html = `<body>
                    <h1>Truy cập localhost( gửi request ), nhận thấy đường dẫn, Gửi Response là 1 file HTML</h1>
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
    if (urlW === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => { // lắng nghe sự kiện 
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            fs.writeFile('message.txt', parseBody.split("=")[1], (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
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
    res.end();
}

// module.exports = requestHandler ; requestHandler ở đây là 1 hàm 


module.exports = {
    requester : requestHandler ,
    someText: "Có thể là một vài thứ gì đó chăng ?" 
}
