const express = require('express'); 
const routes = require('./controllers');
const sequelize = require('./config/connection'); 
const SequelizeStore = require('connect-session-sequelize')(session.Store); 
const path = require('path'); 

//might need this
const helpers = require('./utils/helpers'); 

// handlebars
const exphbs = require('express-handlebars'); 
const hbs = exphbs.create( { helpers }); 

// session
const session = require('express-session'); 

const app = express();
const PORT = process.env.PORT || 3001; 

const sess = {
    secret: "super secret secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize, 
    }), 
}; 

app.use(session(sess));

//set Handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public'))); 


// turn on routes
app.use(routes); 

//turn on connection to db & server 
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`)); 
}); 