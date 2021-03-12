var mysql = require("mysql");

//Constructeur
const Comment = function(comment) {
    this.id = comment.id;
    this.content = comment.content;
    this.user_id = comment.user_id;
    this.article_id = comment.article_id;
    this.date_post = new Date()
};

module.exports = Comment;