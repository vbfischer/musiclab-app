import passport from 'passport';
import {User} from '../models';
import {Strategy as JwtStrategy} from 'passport-jwt';
import jwt from 'jsonwebtoken';

import {BasicStrategy} from 'passport-http';

import {ExtractJwt} from 'passport-jwt';


const basicLogin = new BasicStrategy(function (userid, password, done) {
    User.findOne({email: userid}, function (err, user) {
        console.log('in basicLogin');
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, {
                error: 'Your login details could not be verified'
            });
        }

        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }

            if (!isMatch) {
                return done(null, false, {
                    error: 'Your login details could not be verified'
                });
            }

            return done(null, user);
        });
    });
});
console.log(process.env.JWT_SECRET);
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: process.env.JWT_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    User.findById(payload._id)
        .populate('Group')
        .exec()
        .then((user) => {
            console.log('in jwtLogin');
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }, (err) => {
            return done(err, false);
        });
});

passport.use(jwtLogin);
passport.use(basicLogin);

export const requireAuth = passport.authenticate('jwt', {session: false});
export const requireLogin = passport.authenticate('basic', {session: false});

export const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: 10080
    });
};

export const setUserInfo = (user) => {
    return {
        _id: user._id,
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        email: user.email
    };
};