const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); // Adjusted path

router.get('/test', (req, res) => {
    res.send('deu certo'); // Corrected "req" to "res"
});

// Add job via post
router.post('/add', (req, res) => {
    let { title, salary, company, description, email, new_job } = req.body;
    // Insert
    Job.create({
        title,
        salary,
        company,
        description,
        email,
        new_job
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

module.exports = router;
