const connection = require("../config/db");


// TOUR GUIDES CONTROLLER
const getGuides = (req, res) => {

  try {

    connection.query(`SELECT * FROM tour_guide`, function (error, results, fields) {

      if (error) {

        res.status(500).send({ status: "FAILED", message: "SERVER ERROR", data: error.message });

      } else {

        res.status(201).send({ status: "OK", message: "TOUR GUIDES RETRIEVED SUCCESSFULLY", data: results });

      }

    });

  } catch (error) {

    console.log(error);

  }

};


// TOUR GUIDE CONTROLLER
const getGuide = (req, res) => {

  try {
    
    connection.query(`SELECT * FROM tour_guide WHERE tour_guide_id = '${req.body.tour_guide_id}';`, function (error, results, fields) {

      if (error) {
  
        res.status(500).send({ status: "FAILED", message: "SERVER ERROR", data: error.message });
  
      } else {
  
        res.status(201).send({ status: "OK", message: "TOUR GUIDES RETRIEVED SUCCESSFULLY", data: results });
  
      }
  
    });

  } catch (error) {
    
    console.log(error);

  }

};


// TOUR GUIDE REGISTRATION CONTROLLER
const createGuide = async (req, res) => {

  var guide = req.body;
  console.log(guide);

  try {

    const sql_query = ` CALL register_guide('${guide.firstName}','${guide.middleName}',
    '${guide.lastName}','${guide.phone_no}',
    '${guide.email_address}', '${guide.location}','${guide.bio_desc}', '${guide.birth_date}', 
    '${guide.guidename}', '${guide.pwd}', @sqlMessage)`;

    connection.query(sql_query, function (error, results, fields) {

      if (error) {

        return res.status(500).send({ status: "OK", message: "SERVER SIDE ERROR", data: error.message });

      } else {

        return res.status(201).send({ status: "OK", message: "TOUR GUIDE CREATED SUCCESSFULLY", data: results });

      }

    });

  } catch (error) { console.log(error); }

};


// TOUR GUIDE UPDATE CONTROLLER
const updateGuide = async (req, res) => {

  var employee = req.body;
  console.log(employee);

  try {

    const sql_query =
      `UPDATE tour_guide 
      SET first_name = '${guide.fname}', 
      middle_name = '${guide.mname}',
      surname = '${guide.sname}',
      dob = '${guide.dob}',
      location = '${guide.location}',
      bio_description = '${guide.bio_desc}',
      email = '${guide.email}',
      phone_number = '${guide.phone_no}'`;


    connection.query(sql_query, function (error, results, fields) {

      if (error) {

        return res.status(500).send({ status: "FAILED", message: "SERVER SIDE ERROR", data: error.message });

      } else {

        return res.status(204).send({ status: "OK", message: "TOUR GUIDE UPDATED SUCCESSFULLY", data: results });

      }

    });

  } catch (error) {

    console.log(error);

  }

};


// TOUR GUDE DELETION CONTROLLER
const deleteGuide = async (req, res) => {

  const guide = req.body;
  console.log(guide);

  try {

    const sql_query = `DELETE FROM tour_guide WHERE tour_guide_id = '${guide.tour_guide_id}'`;

    connection.query(sql_query, function (error, results, fields) {

      if (error) {

        return res.status(500).send({ status: "FAILED", message: "SERVER SIDE ERROR", data: error.message });

      } else {

        return res.status(204).send({ status: "OK", message: "TOUR GUIDE DELETED SUCCESSFULLY", data: results });

      }

    });

  } catch (error) {

    console.log(error);

  }

}


module.exports = { getGuide, getGuides, createGuide, updateGuide, deleteGuide };
