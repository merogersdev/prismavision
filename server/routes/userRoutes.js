const router = require('express').Router();

const { protectRoute } = require('../middleware/authMiddleware');

const {
  postRegisterUser,
  getAllUsers,
  postLoginUser,
} = require('../controllers/userController');

router.route('/').get(protectRoute, getAllUsers).post(postRegisterUser);
router.route('/login').post(postLoginUser);

module.exports = router;
