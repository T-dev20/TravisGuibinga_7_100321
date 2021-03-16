const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth.js");
const userCtrl = require("../controllers/user");


router.post('/auth/signup', userCtrl.signup);
router.post('/auth/login', userCtrl.login);
router.get('/users', userCtrl.getAllUsers);
router.get('/users/monprofil', auth, userCtrl.getCurrentUser);
router.put('/users/monprofil', auth, multer, userCtrl.modifyUser);
router.delete('/users/monprofil', auth, userCtrl.deleteCurrentUser);

module.exports = router;