exports.getLogin = (req, res, next)=>{
    console.log(req.get('Cookie').split('=')[1].trim());
    const isLoggedin =  req.get('Cookie').split('=')[1].trim() ; 
    res.render('auth/login', {
        path: '/login' , 
        pageTitle: 'Login' , 
        isAuthenticated : isLoggedin
    });
}

exports.postLogin = (req, res, next)=>{
    // req.isLoggedin = true ; 
    res.setHeader('Set-Cookie', 'loggedIn=true') ;  // HttpOnly, Secure , ... 
    res.redirect('/') ; 
}

   