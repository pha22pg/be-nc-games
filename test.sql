\c nc_games_test;

SELECT reviews.*, COUNT(comments.comment_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY reviews.review_id;

