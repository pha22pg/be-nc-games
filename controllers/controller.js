
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
        const { review_id } = req.params;
       
        // console.log(reviews);
        if(isNaN(review_id)) {
            console.log("Not a number entered")
            res.status(400).send('Status 400: Request was of incorrect type - must be a number')
        }

        if(!reviews.some(review => review.name === review_id)){
            res.status(404).send('Status 404: Review ID not found')
        }
        
       
        // console.log(req.params);
        // console.log(review_id);
        res.status(200).send(reviews);
    })
    .catch((err)=>{
        
        //res.status(400).send({ err });
        next(err)
    })
}