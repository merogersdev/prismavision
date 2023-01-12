const router = require('express').Router();

const { protectRoute } = require('../middleware/authMiddleware');

/*
POST:   /api/users        | Create new User       | Public
GET:    /api/users        | Get All Users         | Private
POST:   /api/users/login  | Login User            | Public
*/

const {
  postRegisterUser,
  getAllUsers,
  postLoginUser,
} = require('../controllers/userController');

router.route('/').get(protectRoute, getAllUsers).post(postRegisterUser);
router.route('/login').post(postLoginUser);

module.exports = router;
