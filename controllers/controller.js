
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
    const { comment_count } = req.params;

    if(comment_count !== "comment_count") {
        return Promise.reject({status:404, msg: "invalid endpoint"});
        
    }
    if(isNaN(review_id)) {
        return Promise.reject({status:404, msg: "invalid endpoint"});
    }
    
   console.log("req.params", req.params);
    fetchReviewCommentCount(review_id)
    .then((reviewObject)=>{
        //reviews[0].commentCount = 3;
        const {review} = reviewObject;
        const {commentCount} = reviewObject;
        review.comment_count = commentCount;
        console.log(review);
        res.status(200).send(review);
    })
    .catch((err)=>{
        next(err)
    })
}