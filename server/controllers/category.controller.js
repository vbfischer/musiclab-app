import {Router} from 'express';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';
import {requireAuth} from '../config/passport';
import logger from '../config/logger';
import {Category} from '../models';

let route = Router({mergeParams: true});

route.use(expressValidator({
    customValidators: {
        isObjectId: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
        }
    }
}));

// Get all categories.
route.get('/', requireAuth, (req, res) => {
    Category.withAccess(req.user, ['read']).exec()
        .then(function (result) {
            res.json(result);
        });
});

// Get Category by ID
route.get('/:id', requireAuth, (req, res) => {
    const userId = req.user._id;
    req.checkParams('id', 'Invalid ID').isObjectId();

    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            result.array().forEach((item) => {
                logger.error('Error getting category by id', item);
            });

            res.status(400).send('There have been validation errors: ');
            return;
        }

        Category.findById(req.params.id)
            .and([{user: userId}])
            .populate('user')
            .exec()
            .then((result) => {
                res.json(result);
            })
    });
});

/**
 * Create a new Category
 */
route.post('/', requireAuth, (req, res) => {
    var category = new Category({
        name: req.body.name,
    });

    req.user.setSubjectAccess(category, ['read', 'write', 'delete']);
    // category.setAccess(req.user, ['read', 'write', 'delete']);

    category.save().then(function () {
        return res.json({
            category
        });
    }, function (err) {
        logger.error(err);
        return res.status(400).send('Duplicate Category Found ');
    });
});

/**
 * Update an existing Category
 */
route.put('/:id', requireAuth, (req, res) => {

});

export default route;