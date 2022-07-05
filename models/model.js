
const db = require("../db/connection");

exports.fetchCategories = () =>{
    return db.query("SELECT * FROM categories;").then(({ rows }) => {
        return rows;
      });
}
exports.fetchReviewsByID = (review_id) =>{
    return db.query("SELECT * FROM reviews WHERE review_id = $1;", [review_id]).then(({ rows }) => {
        console.log(rows)
        if(rows.length) return rows;
        return Promise.reject({status:404, msg: "review_id not found"})
      });
}

exports.alterReviewVotes = (review_id, votes_change) =>{
    console.log("review_id: ", review_id)
    console.log("votes_change: ", votes_change)
    const currentVotes = 0;
   // return db.query("UPDATE reviews SET votes = $2 WHERE review_id = $1 RETURNING *;", [review_id, votes_change])
   return db.query("UPDATE reviews SET votes = $2 WHERE review_id = $1 RETURNING *;", [review_id,votes_change +currentVotes])
    .then(({ rows }) => {
        console.log(rows)
        if(rows.length) return rows;
        return Promise.reject({status:404, msg: "review_id not found"})
      });
}
