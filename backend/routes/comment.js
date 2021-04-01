const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//const verifAuthUser = require("../middleware/verifAuthUser");
const commentCtrl = require("../controllers/comment");



// router.post("/:id", auth, commentCtrl.createComment);
// router.get("/", auth, commentCtrl.getAllComments);
router.put("/:id", auth, commentCtrl.modifyComment); 
router.delete("/:id", auth, commentCtrl.deleteComment);
 

module.exports = router;