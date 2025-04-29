const db = require("../../db/connection.js")

exports.selectTopics = async () => {
    const result = await db.query(`SELECT 
        slug, 
        description 
        FROM topics;`)
    return result.rows 
}

exports.selectArticleById = async (article_id) => {
    const result = await db.query(
        `SELECT * FROM articles
        WHERE article_id = $1`, 
        [article_id])

        if (!result.rows.length) { 
            throw {
                status: 404,
                msg: `Article not found!`
            }
        }       

    return result.rows[0]
}

exports.selectAllArticles = async () => {
    const result = await db.query(`SELECT 
      articles.author, 
      articles.title, 
      articles.article_id, 
      articles.topic, 
      articles.created_at, 
      articles.votes, 
      articles.article_img_url,
      COUNT(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;
  `)
  return result.rows
}

exports.selectCommentsByArticleId = async() => {
    
}