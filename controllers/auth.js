exports.getLogin = (req, res, next)=>{
    console.log(req.get('Cookie').split('=')[1].trim());
    const isLoggedin =  req.get('Cookie').split('=')[1].trim() ; 
    res.render('auth/login', {
        path: '/login' , 
        pageTitle: 'LOGOUT' , 
        isAuthenticated : isLoggedin
    });
}

exports.postLogin = (req, res, next)=>{
    // req.isLoggedin = true ; 
    res.setHeader('Set-Cookie', 'loggedIn=true') ; 
    res.redirect('/') ; 
}

   