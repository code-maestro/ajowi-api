const connection = require("../config/db");


// GET USERS
const getUsers = (req, res) => {

  var user = req.body;
  console.log(user);

  connection.query("SELECT * FROM users;", function (error, results, fields) {

    if (error) {

      res.status(500).send({ status: "OK", message: "POST COMMENT SAVED", data: error.message });

    } else {

      res.status(200).send({ status: "OK", message: "POST COMMENT SAVED", data: results });

    }

  });

};


// A SINGLE USER
const getUser = (req, res) => {

  const user = req.params;

  connection.query(`SELECT * FROM users WHERE user_id = '${user.userID}';`, function (error, results, fields) {

    if (error) {

      res.status(500).send({ status: "FAILED", message: "SERVER ERROR", data: error.message });

    } else {

      res.status(200).send({ status: "OK", message: "USER RETREIVED SUCCESSFULLY", data: results });

    }

  });

};


// USER REGISTRATION CONTROLLER
const createUser = async (req, res) => {

  var user = req.body;
  console.log(user);

  try {

    const sql_query = ` CALL register_user('${user.firstName}','${user.middleName}',
                                            '${user.lastName}','${user.phone_no}',
                                            '${user.email_address}', '${user.birth_date}', 
                                            '${user.username}', '${user.pwd}', @sqlMessage)`;

    connection.query(sql_query, function (error, results, fields) {

      if (error) {

        return res.status(500).send({ status: "OK", message: "POST COMMENT SAVED", data: error.message });

      } else {

        return res.status(201).send({ status: "OK", message: "USER CREATED", data: results });

      }

    });

  } catch (error) {

    console.log(error);

  }

};


// TOUR USER UPDATE CONTROLLER
const updateUser = async (req, res) => {

  const user = req.body;

  console.log(user);

  const user_id = req.params.userID;

  console.log(user_id);

  try {

    const sql_query = `UPDATE users 
                        SET first_name = '${user.first_name}',
                        middle_name = '${user.middle_name}',
                        last_name = '${user.last_name}',
                        phone_number = '${user.phone_no}',
                        email_address = '${user.email_address}',
                        dob = '${user.dob}'
                        WHERE user_id = '${user_id}';`

    connection.query(sql_query, function (error, results, fields) {

      if (error) {

        res.status(500).send({ status: "OK", message: "SERVER SIDE ERROR", data: error.message });

      } else {

        console.log(results.affectedRows);

        res.status(204).send({ status: "OK", message: "USER UPDATED SUCCESSFULLY", data: results.affectedRows });

      }

    });

  } catch (error) {

    console.log(error);

  }

};


// TOUR GUDE DELETION CONTROLLER
const deleteUser = async (req, res) => {

  const user = req.body;
  console.log(user);

  try {

    connection.query(`DELETE FROM users WHERE user_id = '${user.user_id}')`,

      function (error, results, fields) {

        if (error) {

          return res.status(500).send({ status: "OK", message: "SERVER SIDE ERROR", data: error.message });

        } else {

          return res.status(204).send({ status: "OK", message: "USER DELETED SUCCESSFULLY", data: results });

        }

      });

  } catch (error) {

    console.log(error);

  }

}


module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };


