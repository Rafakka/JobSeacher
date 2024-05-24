const express = require("express");
const app = express();
const db = require('./db/connection');
const bodyParser = require ('body-parser');

const PORT = 3000;

//body parser

app.use(bodyParser.urlencoded({extended:false}));

app.listen (PORT, function(){
    console.log(`O express esta rodando na porta ${PORT}`);
});

// db connections
db
    .authenticate()
    .then(() => {
        console.log ("Conectou o banco com sucesso");
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conectar", err);
    });

// routes
app.get ('/', (req,res) => {
    res.send("Esta funcionado");
});

// jobs routes
app.use('/jobs', require('./routes/jobs'));