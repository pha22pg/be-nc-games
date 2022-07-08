
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


exports.fetchReviewCommentCount = (review_id) =>{
    
    const fetchCommentCount = db.query("SELECT * FROM comments WHERE review_id = $1;", [review_id]).then(({ rows }) => {
            const commentCount = rows.length;
            return commentCount;
    });
    const fetchReviewByID = db.query("SELECT * FROM reviews WHERE review_id = $1;", [review_id]).then(({ rows }) => {
        if(rows.length){
            return rows[0];
        } 
        return Promise.reject({status:404, msg: "review_id not found"})
    }); 
    return Promise.all([fetchCommentCount, fetchReviewByID])
    .then(([commentCount, review])=>{
    
        const returnObject = { commentCount, review };
        return returnObject;
    })
}

exports.fetchReviews = () => {
   
    return db.query(`SELECT reviews.*, COUNT(comments.comment_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY reviews.review_id ORDER BY reviews.created_at;`).then(({ rows }) => {
        return rows;
      });
}