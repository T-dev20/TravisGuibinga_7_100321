module.exports = (sequelize, Sequelize) => {
    const like_Post = sequelize.define('like_Post', { 
      id:{ 
          type:Sequelize.INTEGER, 
          autoIncrement:true, 
          allowNull:false, 
          primaryKey:true
      }, 
       createdAt: Sequelize.DATE, 
       updatedAt: Sequelize.DATE, 
  }) 
    
      return like_Post;
  };