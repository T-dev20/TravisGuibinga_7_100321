const express = require("express");
const router = express.Router(); // On crée un routeur Express
const auth = require("../middleware/auth");
const articleCtrl = require("../controllers/article");



router.post("/add", articleCtrl.createArticle);
router.get("/", articleCtrl.getAllArticles);
router.get("/:id", articleCtrl.getOneArticle);
router.put("/:id", articleCtrl.modifyArticle); 
router.delete("/:id", articleCtrl.deleteArticle);
 

module.exports = router;