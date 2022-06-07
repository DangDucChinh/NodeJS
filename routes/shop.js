const express = require('express') ; 
const router = express.Router(); 

router.use('/',(req, res , next)=>{
    res.send('<h1>HELLO FROM NODE JS !!!</h1>')
});
module.exports = router ; 