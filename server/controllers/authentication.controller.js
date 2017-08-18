import {Router} from 'express';
import {User, Group} from '../models';
import {requireLogin, generateToken, setUserInfo} from '../config/passport';
import Promise from 'bluebird';
import ValidateMiddleware from '../middleware/validate';
import Joi from 'joi';

const validation = {
    registerForm: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    })
};

let route = Router({mergeParams: true});

route.post('/login', requireLogin, (req, res, next) => {
    let userInfo = setUserInfo(req.user);

    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
});

route.get('/logout', (req, res) => {
    req.logout();

    res.json({
        loggedOut: true
    });
});

route.get('/reset', (req, res) => {
    Promise.all([
        User.remove({}).exec(),
        Group.remove({}).exec()
    ])
        .then(() => {
            res.json({
                done: true
            });
        });
});

route.post('/register', ValidateMiddleware(validation.registerForm), (req, res, next) => {
    const {email, firstName, lastName, password} = req.body;

    User.findOne({email: email}, function (err, existingUser) {
        if (err) {
            return next(err);
        }

        if (existingUser) {
            return res.status(422).send({error: 'That email address is already in use'});
        }

        let user = new User({
            email,
            password,
            profile: {
                firstName,
                lastName
            }
        });

        let group = new Group({
            name: 'Group: ' + user._id,
            owner_id: user._id
        });

        user.groups = [group];


        user.setSubjectAccess(group, ['read', 'write', 'delete']);

        Promise.all([
            user.save(),
            group.save()
        ]).then(([user]) => {
            const userInfo = setUserInfo(user);

            res.json({
                user: userInfo,
                token: 'JWT' + generateToken(userInfo)
            })

        });
    });
});

export default route;
