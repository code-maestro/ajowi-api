const connection = require("../config/db");

const dotenv = require('dotenv');
dotenv.config();

const jwt = require("jsonwebtoken");


const login = (req, res) => {

  const credentials = req.body;

  const sql_query = `SELECT * FROM authenticate_user 
                      WHERE user_name = '${credentials.username}' 
                      AND AES_DECRYPT(FROM_BASE64(password), '${credentials.username}') = '${credentials.password}';`

  connection.query(sql_query, function (error, results, fields) {

    if (error) {

      res.status(500).send({ status: "FAILED", message: "WRONG USERNAME OR PASSWORD", data: error.message });

    } else {

      const credentials = results[0];

      const user = {
        user_id: credentials.login_id,
        user_name: credentials.user_name,
        user_email: credentials.email_address
      };

      jwt.sign({ user: user }, process.env.TOKEN_KEY, (err, token) => {

        if (err) {

          console.log(err);

        } else {

          res.status(201).header("auth-token", token).send({ status: "OK", message: "USER LOGGED IN SUCCESSFULLY SAVED", data: token });
          
        }

      });

    }

  });

};


module.exports = { login };