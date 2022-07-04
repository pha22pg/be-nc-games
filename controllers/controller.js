
const { fetchCategories, fetchReviews } = require('../models/model')

exports.getCategories = (req,res,next) =>{
    fetchCategories()
    .then((categories)=>{
        res.status(200).send({categories});
        }
    )
    .catch((err)=>{
        console.log(err)
        next(err)
    })
}

exports.getReviews = (req,res, next) =>{
    fetchReviews()
    .then((reviews)=>{
        res.status(200).send(reviews);
    })
    .catch((err)=>{
        console.log(err)
        next(err)
    })
}