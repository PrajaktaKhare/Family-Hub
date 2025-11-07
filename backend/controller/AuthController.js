// middlewares/checkAuth.js
export const checkAuth = (req, res, next) => {
    if (req && req.session && req.session.user) {
        // User is logged in
        return next();
    }else{

    }

    // Otherwise redirect to login page
    res.redirect('/api/users/login', {layout: 'home', hideNavbar: true});
};
