
const { fetchCategories, fetchReviewsByID, alterReviewVotes, fetchReviewCommentCount } = require('../models/model')

exports.getCategories = (req,res,next) =>{
    fetchCategories()
    .then((categories)=>{
        res.status(200).send({categories});
        }
    )
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

exports.getReviewCommentCount = (req,res, next) =>{
    const { review_id } = req.params;
   // console.log("req.params", req.params);
    fetchReviewCommentCount(review_id)
    .then((reviews)=>{
        //reviews[0].commentCount = 3;
        const {user} = reviews;
        const {commentCount} = reviews;
        user.comment_count = commentCount;
        console.log(user);
        res.status(200).send(user);
    })
    .catch((err)=>{
        next(err)
    })
}