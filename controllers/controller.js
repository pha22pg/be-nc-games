

const { fetchCategories, fetchReviewsByID, fetchUsers, alterReviewVotes, fetchReviewCommentCount, fetchReviewComments} = require('../models/model')


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
    console.log("in getreviewsbyid")
    fetchReviewCommentCount(review_id)
    .then(({commentCount, review})=>{
        console.log(commentCount, review);
        review.comment_count =  commentCount;
        //reviews[0].commentCount = 3;
       res.status(200).send({ review });
    })
    .catch((err)=>{
        next(err);
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

exports.getReviewComments = (req,res,next) => {
    const { review_id } = req.params;
    
    fetchReviewComments(review_id)
    .then((comments)=>{
        
        res.status(200).send({comments});
    })
    .catch((err)=>{
        next(err);
    })
}