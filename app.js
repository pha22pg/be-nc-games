const express = require('express');

const app = express();
const { getCategories, getReviews} = require('./controllers/controller')



app.use(express.json());

app.get('/api/categories', getCategories);
app.get('/api/reviews/:review_id', getReviews);

app.all('*', (req,res)=>{
    res.status(404).send({msg: "Invalid endpoint"})
})

module.exports = app;