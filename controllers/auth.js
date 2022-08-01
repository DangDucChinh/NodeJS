exports.getLogin = (req, res, next)=>{
    res.render('auth/login', {
        path: '/login' , 
        pageTitle: 'Login' , 
        isAuthenticated : req.isLoggedin
    });
}

exports.postLogin = (req, res, next)=>{
    req.isLoggedin = true ; 
    res.redirect('/') ; 
}

