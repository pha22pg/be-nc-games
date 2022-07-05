const express = require('express');

const app = express();
const { getCategories, getReviews} = require('./controllers/controller')



app.use(express.json());

app.get('/api/categories', getCategories);
app.get('/api/reviews/:review_id', getReviews);

app.get('*', (req,res)=>{
    res.status(404).send({msg: "Invalid endpoint"})
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(404).send('Status 404: Bad Path');
});

module.exports = app;