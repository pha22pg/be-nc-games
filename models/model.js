
const db = require("../db/connection");

exports.fetchCategories = () =>{
    return db.query("SELECT * FROM categories;").then(({ rows }) => {
        return rows;
      });
}
exports.fetchReviewsByID = (review_id) =>{
    return db.query("SELECT * FROM reviews WHERE review_id = $1;", [review_id]).then(({ rows }) => {
        if(rows.length) return rows;
        return Promise.reject({status:404, msg: "review_id not found"})
      });
}

exports.fetchUsers = () =>{
    return db.query("SELECT * FROM users;").then(({ rows }) => {
        return rows;
      });
}


exports.alterReviewVotes = (review_id, votes_change) =>{
    if(votes_change === undefined){ 
        return Promise.reject({status:404, msg: "request object incorrectly formatted"}) 
    }
   return db.query("UPDATE reviews SET votes = votes + $2 WHERE review_id = $1 RETURNING *;", [review_id,votes_change])
    .then(({ rows }) => {
        if(rows.length) return rows;
        
        return Promise.reject({status:404, msg: "review_id not found"})
      });
}


exports.fetchReviewCommentCount = (review_id, comment_count) =>{
    if(comment_count !== "comment_count") {
        return Promise.reject({status:404, msg: "Bad request"});
        
    }
    if(isNaN(review_id)) {
        return Promise.reject({status:404, msg: "Invalid endpoint, review_id needs to be an integer"});
    }

    const fetchCommentCount = db.query("SELECT * FROM comments WHERE review_id = $1;", [review_id]).then(({ rows }) => {
            const commentCount = rows.length;
            return commentCount;
    });
    const fetUserByID = db.query("SELECT * FROM reviews WHERE review_id = $1;", [review_id]).then(({ rows }) => {
        if(rows.length){
            return rows;
        } 
        return Promise.reject({status:404, msg: "review_id not found"})
    }); 
    return Promise.all([fetchCommentCount, fetUserByID])
    .then((values)=>{
        // console.log("result of fetchCommentCount: ", values[0])
        // console.log("result of fetchUserByID:     ", values[1]);
        const returnObject = { commentCount : values[0], review : values[1][0]}
        return returnObject;
    })
    // .catch((err)=>{
    //     console.log(err);
    // })

}

