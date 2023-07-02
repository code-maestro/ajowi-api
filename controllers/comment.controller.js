const connection = require("../config/db");

// GET ALL POST COMMENTS
const getComments = (req, res) => {

  connection.query(`SELECT * FROM post_comments WHERE post_id = '${req.body.post_id}';`, function (error, results, fields) {

    if (error) {

      res.status(500).send({ status: "FAILED", message: "SERVER ERROR", data: error.message });

    } else {

      res.status(201).send({ status: "OK", message: "POST COMMMENT FETCH SUCCESSFULLY", data: results });

    }

  });

};


// GET ONE COMMENT
const getComment = (req, res) => {

  try {

    connection.query(`SELECT * FROM post_comments WHERE comment_id = '${req.body.post_id}';`, function (error, results, fields) {

      if (error) {

        res.status(500).send({ status: "FAILED", message: "SERVER ERROR", data: error.message });

      } else {

        res.status(201).send({ status: "OK", message: "POST COMMENT SAVED", data: results });

      }

    });

  } catch (error) {

    console.log(error);

  }

};


// USER REGISTRATION CONTROLLER
const createComment = async (req, res) => {

  var comment = req.body;
  console.log(comment);

  try {

    connection.query(`INSERT INTO post_comments (comment, user_id, post_id) VALUES ( '${comment.comment}', '${comment.user_id}', '${comment.post_id}')`,

      function (error, results, fields) {

        if (error) {

          return res.status(500).send({ status: "FAILED", message: "SERVER ERROR", data: error.message });

        } else {

          return res.status(201).send({ status: "OK", message: "POST COMMENT UPDATED SUCCESSFULLY", data: results });

        }

      });

  } catch (error) {

    console.log(error);

  }

};


// USER REGISTRATION CONTROLLER
const createCommentReply = async (req, res) => {

  var comment = req.body;
  console.log(comment);

  try {

    connection.query(`INSERT INTO comment_reply (comment, user_id, post_id) VALUES ( '${comment.comment}', '${comment.user_id}', '${comment.post_id}')`,

      function (error, results, fields) {

        if (error) {

          return res.status(500).send({ status: "FAILED", message: "SERVER ERROR", data: error.message });

        } else {

          return res.status(201).send({ status: "OK", message: "POST COMMENT UPDATED SUCCESSFULLY", data: results });

        }

      });

  } catch (error) {

    console.log(error);

  }

};


// POST COMMENT UPDATE CONTROLLER
const updateComment = async (req, res) => {

  var comment = req.body;

  console.log(comment);

  try {

    connection.query(`UPDATE post_comments SET comment = '${comment.comment}' WHERE post_id = '${comment.post_id}'`,

      function (error, results, fields) {

        if (error) {

          return res.status(500).send({ status: " FAILED ", message: "SERVER SIDE ERROR", data: error.message });

        } else {

          return res.status(204).send({ status: "OK", message: "POST COMMENT UPDATED SUCCESSFULLY", data: results });

        }

      });

  } catch (error) {

    console.log(error);

  }
};


// POST COMMENT DELETION CONTROLLER
const deleteComment = async (req, res) => {

  var comment = req.body;

  console.log(comment);

  try {

    connection.query(`DELETE FROM post_comments  WHERE post_id = '${comment.post_id}'`,

      function (error, results, fields) {

        if (error) {

          return res.status(500).send({ status: " FAILED", message: "SERVER SIDE ERROR", data: error.message });

        } else {

          return res.status(204).send({ status: "OK", message: "POST COMMENT DELETED SUCCESSFULLY", data: results });

        }

      });

  } catch (error) {

    console.log(error);

  }
}



module.exports = { getComment, getComments, createComment, createCommentReply, updateComment, deleteComment };
