
const { fetchCategories } = require('../models/model')

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