const express = require('express');

const app = express();
const { getCategories } = require('./controllers/controller')



app.use(express.json());

app.get('/api/categories', getCategories);

app.get('*', (req,res)=>{
    res.status(404).send({msg: "Invalid endpoint"})
})
module.exports = app;