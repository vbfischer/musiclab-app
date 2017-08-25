import {Router} from 'express';

import {requireAuth} from '../config/passport';
import {User} from '../models';

let route = Router({mergeParams: true});

route.get('/', requireAuth, (req, res) => {
    res.json(req.user);
});

export default route;