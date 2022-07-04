
const db = require("../db/connection");

exports.fetchCategories = () =>{
    return db.query("SELECT * FROM categories;").then(({ rows }) => {
        return rows;
      });
}
exports.fetchReview = () =>{
    return db.query("SELECT * FROM reviews;").then(({ rows }) => {
        return rows;
      });
}