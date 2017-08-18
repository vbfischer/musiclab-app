import {Router} from 'express';

import {Group, User} from '../models';
import {requireAuth} from '../config/passport';
import logger from '../config/logger';

let route = Router({mergeParams: true});

route.param('groupId', (req, res, next, id) => {
    Group.findById(id).exec()
        .then((group) => {
            req.group = group;

            next();
        })
});

route.param('childId', (req, res, next, id) => {
    console.log(id);
    User.findById(id).exec()
        .then((childUser) => {
            req.childUser = childUser;

            next();
        });
});

/**
 * Get All Groups for logged in user (readable).
 *
 */
route.get('/', requireAuth, (req, res) => {
    Group.withAccess(req.user, ['read']).exec(function (err, groups) {
        logger.error(err);
        logger.info(groups);

        res.json(groups);
    });
});

/**
 * Get by group id.
 */
route.get('/:groupId', requireAuth, (req, res) => {

    res.json(req.group);
});

/**
 * Create a new group, give current user all permissions
 */
route.post('/', requireAuth, (req, res) => {
    const user = req.user;
    const id = user._id;
    const asPublic = req.body.asPublic;

    let group = new Group({
        name: req.body.name,
        owner_id: id
    });

    user.setAccess(group, ['read', 'write', 'delete']);

    // LOCK THIS PUPPY DOWN!!!
    if(asPublic) {
        group.setAccess('*', ['read']);
    }

    group.save()
        .then(() => {
            res.json(group)
        });
});

route.post('/:groupId/add/user/:childId', requireAuth, (req, res) => {
    req.childUser.setAccess(req.group, ['read']);

    req.group.save()
        .then((group) => {
            res.json(group);
        });
});

export default route;