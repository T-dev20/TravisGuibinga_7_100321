var mysql = require("mysql");

//Constructeur
const Article = function(article) {
    this.id = article.id;
    this.content = article.content;
    this.user_id = article.user_id;
    this.image = article.image;
    this.date_post = new Date();
    this.date_update_post = article.date_update_post
};

module.exports = Article;