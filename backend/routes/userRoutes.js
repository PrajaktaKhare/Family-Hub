import express from 'express';
import { registerUser, saveUser, loginUser, verifyLoginUser } from '../controller/UserController.js';
import passport from 'passport';

const userRouter = express.Router();

userRouter.get('/register', registerUser); //register new user
userRouter.post('/register', saveUser);

userRouter.get('/login', loginUser); //login user view

//use passport js
userRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // User not found or invalid credentials
        if (!user) {
            return res.format({
                'application/json': () => {
                    res.status(401).json({ message: info?.message || 'Invalid credentials' });
                },
                'text/html': () => {
                    res.render('login', { message: info?.message || 'Invalid credentials' });
                }
            });

        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            verifyLoginUser(req, res);
        });

    })(req, res, next)
})

userRouter.get('/logout', (req, res, next) => {

    req.logOut(err => {
        req.session.destroy();
        if (err) return next(err);
        res.redirect('/');
    });
})
export default userRouter;
