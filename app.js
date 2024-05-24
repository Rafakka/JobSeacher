const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const path = require("path");
const db = require('./db/connection');
const bodyParser = require ('body-parser');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const PORT = 3000;

// Handlebars setup
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Start the server
app.listen(PORT, function(){
    console.log(`Express is running on port ${PORT}`);
});

// Database connection
db.authenticate()
  .then(() => {
      console.log("Database connection successful");
  })
  .catch(err => {
      console.error("Unable to connect to the database:", err);
  });

// Routes
app.get('/', (req, res) => {

    let search = req.query.job;
    let query = '%'+search+'%';

    if(!search){
        Job.findAll({order: [
            ['createdAT', 'DESC']
        ]})
        .then(jobs => {
            res.render("index", {
                jobs
            });
        })
        .catch(err => console.log(err));
    } else {
        Job.findAll({
            where:{title:{[Op.like]:query}},
            order: [
            ['createdAT', 'DESC']
        ]})
        .then(jobs => {
            res.render("index", {
                jobs, search
            });
        })
        .catch(err => console.log(err));
    }
    
});

// Jobs routes
app.use('/jobs', require('./routes/jobs'));
