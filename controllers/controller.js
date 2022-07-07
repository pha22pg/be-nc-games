


const { fetchCategories, fetchReviewsByID, fetchUsers, alterReviewVotes } = require('../models/model')


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

exports.getReviewsByID = (req,res, next) =>{
    const { review_id } = req.params;
    fetchReviewsByID(review_id)
    .then((reviews)=>{

        res.status(200).send(reviews);
    })
    .catch((err)=>{

        next(err)
    })
}

exports.getReviewsByID = (req,res, next) =>{
    const { review_id } = req.params;
    fetchReviewsByID(review_id)
    .then((reviews)=>{
        res.status(200).send(reviews);
    })
    .catch((err)=>{
        //res.status(400).send({ err });
        next(err)
    })
}


exports.getUsers = (req, res, next) => {
    fetchUsers()
    .then((users)=>{
        res.status(200).send({users});
        }
    )
    .catch((err)=>{
        console.log(err)
        next(err)
    }) 

exports.updateReviewVotes = (req,res,next) => {
    const { review_id } = req.params;
    const { inc_votes } = req.body;
    alterReviewVotes(review_id, inc_votes)
    .then((reviews)=>{
        res.status(200).send(reviews[0]);
    })
    .catch((err)=>{
        next(err);
    })

}