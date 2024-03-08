const router = require('express').Router();
const { getChallenge, attestToken  } = require('../controllers/attest');
const verify = require('../utils/verifyToken');

// // Get User By Id
// router.get('/getUser/:id', verify, getUserById);

// Get User By Id

router.get('/getSession', getChallenge);
router.post('/attestToken', attestToken);

// // Register User
// router.post('/register', verify, createUser);

// // Update User Password
// router.patch('/updatePassword/:id', verify, updateUserPassword);

module.exports = router;