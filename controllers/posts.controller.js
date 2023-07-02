const connection = require("../config/db");


const getPosts = (req, res) => {

  try {
    
    const sql_query = `SELECT * FROM posts`;

    connection.query(sql_query, function (error, results, fields) {
  
      if (error) {
  
        res.status(500).send({ status: "FAILED", message: " SERVER ERROR", data: error.message });
  
      } else {
  
        res.status(201).send({ status: "OK", message: "POSTS RETREIVED SUCCESSFULLY", data: results });
  
      }
  
    });

  } catch (error) {
   
    console.log(error);
    
  }

};


// GET ONE POST
const getPost = (req, res) => {

  try {

    const sql_query = `SELECT * FROM posts WHERE post_id = '${post.post_id}'`;

    connection.query(sql_query, function (error, results, fields) {

      if (error) {

        res.status(500).send({ status: "OK", message: "POST COMMENT SAVED", data: error.message });

      } else {

        res.status(201).send({ status: "OK", message: "POST COMMENT SAVED", data: results });

      }

    });

  } catch (error) {

    console.log(error);

  }

};


// USER REGISTRATION CONTROLLER
const createPost = async (req, res) => {

  const post = req.body;
  console.log(post);

  console.log(req.user);

  try {

    const sql_query = `INSERT INTO posts (post_title,post_description,location,media_url,guide_id)
                       VALUES ('${post.post_title}', '${post.post_desc}', '${post.location}', '${post.media_url}','${req.user.user_id}';`;


    connection.query(sql_query, function (error, results, fields) {

      if (error) {

        return res.status(500).send({ status: "FAILED", message: "SERVER ERROR", data: error.message });

      } else {

        return res.status(201).send({ status: "OK", message: "POST HAS BEEN CREATED SUCCESSFULLY", data: results });

      }

    });

  } catch (error) {

    console.log(error);

  }

};


// POST UPDATE CONTROLLER
const updatePost = async (req, res) => {

  const post = req.body;
  console.log(post);

  console.log(req.user);

  try {

    const sql_query = `UPDATE posts 
                       SET post_title = '${post.post_title}',
                       post_description = '${post.post_desc}',
                       location = '${post.location}',
                       guide_id = '${req.user.user_id}';`;

    connection.query(sql_query, function (error, results, fields) {

      if (error) {

        return res.status(500).send({ status: "FAILED", message: "SERVER SIDE ERROR", data: error.message });

      } else {

        return res.status(204).send({ status: "OK", message: "POST UPDATED SUCCESSFULLY", data: results });

      }

    });

  } catch (error) {

    console.log(error);

  }
};


// POST DELETION CONTROLLER
const deletePost = async (req, res) => {

  const post = req.body;
  console.log(post);

  console.log(req.user);

  try {
    const sql_query = `DELETE FROM posts 
                       WHERE post_id = '${post.post_id}',
                       AND guide_id = '${req.user.user_id}';`;

    connection.query(sql_query, function (error, results, fields) {

      if (error) {

        return res.status(500).send({ status: "FAILED", message: "SERVER SIDE ERROR", data: error.message });

      } else {

        return res.status(204).send({ status: "OK", message: "POST DELETED SUCCESSFULLY", data: results });

      }

    });

  } catch (error) {

    console.log(error);

  }
}


module.exports = { getPost, getPosts, createPost, updatePost, deletePost };
