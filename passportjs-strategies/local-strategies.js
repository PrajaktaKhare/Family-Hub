import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"
import User from "../backend/models/User.js";

export default function configureLocalStrategy(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' },
        async (email, password, done) => {
            
            
            try {
                const user = await User.findOne({ email });
                if (!user) return done(null, false, { message: 'Invalid email or password' });

                if (password !== user.password) { // ideally hash+compare
                    return done(null, false, { message: 'Invalid email or password' });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }

        }

    ));


// --- Serialize user ---
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// --- Deserialize user ---
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
}