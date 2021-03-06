module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', { 
    id:{ 
        type:Sequelize.INTEGER.UNSIGNED, 
        autoIncrement:true, 
        allowNull:false, 
        primaryKey:true
    }, 
    name: { 
      type: Sequelize.STRING, 
      allowNull:false,
      unique: true
    }, 
    email: { 
      type: Sequelize.STRING, 
      allowNull:false,
      unique: true
    }, 
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    job: { 
      type: Sequelize.STRING, 
      allowNull: false,
    }, 
    image_profil: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "User",
    },
  
     createdAt: Sequelize.DATE, 
     updatedAt: Sequelize.DATE, 
}) 
  
    return User;
};