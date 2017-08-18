import {Router} from 'express';

import {Goal} from '../models';
import {requireAuth} from '../config/passport';

let route = Router({mergeParams: true});

route.get('/', requireAuth, (req, res) => {
    Goal.withAccess(req.user, ['read']).exec()
        .then(function (result) {
            res.json(result);
        });
});

route.post('/', requireAuth, (req, res) => {
    const id = req.user._id;
    const {name, category, tags, description, reference} = req.body;

    let goal = new Goal({
        name,
        tags,
        category,
        description,
        owner_id: id
    });

    req.user.setAccess(goal, ['read', 'write', 'delete']);

    goal.save().then(() => {
        return res.json(goal);
    });
});

export default route;