const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const thumbCtrl = require("../controllers/thumb");


router.post("/:id/like", thumbCtrl.createthumb);
router.post("/:id/dislike", thumbCtrl.createthumb);
// router.post("/id", thumbCtrl.createthumb);
// router.get("/", thumbCtrl.getAllthumbs);
// router.get("/:id", thumbCtrl.getOnethumb);
// router.put("/:id", thumbCtrl.modifythumb); 
// router.delete("/:id", thumbCtrl.deletethumb);
 

module.exports = router;