

exports.getLogin = (req, res, next)=>{
    // console.log(req.get('Cookie').split('=')[1].trim());
    // const isLoggedin =  req.get('Cookie').split('=')[1].trim() ; 
    const Loggedin =  req.session.isLoggedin ; 
    console.log(req.session.isLoggedin) ; 
    res.render('auth/login', {
        path: '/login' , 
        pageTitle: 'Login' , 
        isAuthenticated : Loggedin
    });
}

exports.postLogin = (req, res, next)=>{
     req.session.isLoggedin = true ; 
    // res.setHeader('Set-Cookie', 'loggedIn=true') ;  // HttpOnly, Secure , ... 
    res.redirect('/') ; 
}

exports.postLogout = (req, res ,next)=>{
    req.session.destroy(err=>{
        console.log(err) ; 
        console.log('DESTROYED SESSION !');
        res.redirect('/') ; 
    })
}

   