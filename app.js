const express = require('express');
const app = express();
const { getCategories, getReviewsByID, updateReviewVotes, getUsers, getReviews} = require('./controllers/controller');

app.use(express.json());

app.get('/api/categories', getCategories);
app.get('/api/reviews/:review_id', getReviewsByID);
app.get('/api/users/', getUsers);
app.patch('/api/reviews/:review_id', updateReviewVotes);
app.get('/api/reviews', getReviews);


app.all('*', (req,res)=>{
    res.status(404).send({msg: "Invalid endpoint"})
})
app.use((err,req,res,next)=>{
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg});
    }
    next(err);
})

app.use((err,req,res,next)=>{
    if(err.code === "22P02"){
        res.status(400).send({msg: "Bad request"})
    }
    next(err);
})
app.use((err,req,res,next)=>{
    
    res.status(500).send({key : 'server error'});
})


module.exports = app;