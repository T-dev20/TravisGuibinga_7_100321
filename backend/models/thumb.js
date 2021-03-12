var mysql = require("mysql");

//Constructeur
const Thumb = function(thumb) {
    this.id = thumb.id;
    this.user_id = thumb.user_id;
    this.article_id = thumb.article_id;
    this.thumb = thumb.thumb;
    this.likes = thumb.likes;
    this.dislikes = thumb.dislikes;
};

module.exports = Thumb;