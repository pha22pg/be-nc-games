

const { fetchCategories, fetchReviewsByID, fetchUsers, alterReviewVotes, fetchReviewCommentCount, fetchReviews} = require('../models/model')


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
    
    fetchReviewCommentCount(review_id)
    .then(({commentCount, review})=>{
      
        review.comment_count =  commentCount;
       
       res.status(200).send({review});
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

exports.getReviews = (req,res,next) => {
    fetchReviews().
    then((reviews)=>{
        //console.log(reviews)
        res.status(200).send({reviews});
    })
    .catch((err)=>{
        next(err);
    })
}