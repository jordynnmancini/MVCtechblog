const sequelize = require ('../config/connection');
const { Blog, Comment, User } = require('../models'); 

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true }); 

    console.log('------------SEEDING USER DATA------------');
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    console.log('------------SEEDING BLOG DATA------------');
    await Blog.bulkCreate(blogData, {
        individualHooks: true,
        returning: true, 
    }); 

    console.log('------------SEEDING COMMENT DATA------------');
    await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true, 
    });

    process.exit(0); 
}; 

seedDatabase(); 