const router = require('express').Router();

const { protectRoute } = require('../middleware/authMiddleware');

/*
POST:   /api/images/      | Send image to Vision  | Private
POST:   /api/images/new   | Add new Image to DB   | Private
*/

const { postNewImage } = require('../controllers/imageController');

router.route('/').post(protectRoute, postNewImage);

module.exports = router;
