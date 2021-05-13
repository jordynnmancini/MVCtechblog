const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth'); 

// render homepage with blog posts 
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User, 
                },
            ], 
        }); 
        const blogs = blogData.map((blog) => blog.get({ plain: true })); 

        res.render('homepage', {
            layout: 'main',
            logged_in: req.session.logged_in, 
            blogs, 
        });
    } catch (err) {
        res.status(500).json(err);
    }
}); 

//render user's dashboard - contains the blog posts they've created with comments 
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Blog,
                    include: [{
                        model: Comment,
                        include: {model: User, attributes: ['username']}

                    }]
                }, 
            ]
        });

        const user = userData.get({ plain: true }); 

        res.render('dashboard', {
            layout: 'main',
            user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err); 
    }
}); 

// render login/signup page 
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return; 
    };

    res.render('login'); 
}); 

// render individual blog post with it's comments 
router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
               id: req.params.id,  
            },
            include: [
                {
                    model: User
                },
                {
                    model: Comment,
                    include: [{model: User, attributes: ['username']}]
                }, 
            ],
        });
        const blogArray = blogData.map((blog) => blog.get({ plain: true })); 
        const blog = blogArray[0]; 

        res.render('blog', {
            layout: 'main',
            logged_in: true,
            blog
        }); 
    } catch (err) {
        res.status(500).json(err); 

    }
}); 


module.exports = router; 