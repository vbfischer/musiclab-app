var express = require('express');
var router = express.Router();
const AuthenticationController = require('../controllers/authentication');
const CategoryController = require('../controllers/category');
const DocumentController = require('../controllers/document');
const JournalController = require('../controllers/journal');
const multer = require('multer');

const upload = multer({
    dest: 'uploads/'
});

const passortService = require('../config/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

// AUTH ROUTES
router.post('/register', AuthenticationController.register);
router.post('/login', requireLogin, AuthenticationController.login);

/* GET users listing. */
router.get('/list', requireAuth, function(req, res, next) {
    res.json([{
        id: 1,
        username: "samsepi0l"
    }, {
        id: 2,
        username: "D0loresH4ze"
    }]);
});

router.get('/category', requireAuth, CategoryController.list);

router.post('/category', requireAuth, CategoryController.create);

router.post('/document', requireAuth, upload.single('doc'), DocumentController.create);

router.post('/journal_entry', requireAuth, JournalController.create);

module.exports = router;
