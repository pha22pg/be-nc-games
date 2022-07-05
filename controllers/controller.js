
const { fetchCategories, fetchReviewsByID, alterReviewVotes } = require('../models/model')

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

exports.updateReviewVotes = (req,res,next) => {
    const { review_id } = req.params;
    const { inc_votes } = req.body;
    console.log(inc_votes);

    alterReviewVotes(review_id, inc_votes)
    .then(()=>{

    })
    .catch((err)=>{
        console.log(err)
    })
}