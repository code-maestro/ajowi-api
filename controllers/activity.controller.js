const connection = require("../config/db");



const getActivities = (req, res) => {

  connection.query(`SELECT * FROM tour_activities ORDER BY RAND();`, function (error, results, fields) {

    if (error) {

      return res.status(500).send({ status: "FAILED", message: "SERVER ERROR", data: error.message });

    } else {

      res.status(201).send({ status: "OK", message: "TOUR ACTIVIIES FETCHED SUCCESSFULLY", data: results });

    }

  });

};



const getActivity = (req, res) => {
  
  try {

    connection.query(`SELECT * FROM tour_activities WHERE activity_id = '${req.params.activityID}';`, function (error, results, fields) {

      if (error) {

        return res.status(500).send({ status: "FAILED", message: "SERVER ERROR", data: error.message });

      } else {

        res.status(201).send({ status: "OK", message: "POST COMMENT SAVED", data: results });

      }

    });

  } catch (error) {

    console.log(error);

  }

};



const createActivity = async (req, res) => {

  var activity = req.body;
  console.log(activity);

  try {

    connection.query(`INSERT INTO tour_activities (title, description, tour_guide_id, fee_per_hour, media_url) VALUES ('${activity.title}', '${activity.description}','${activity.tour_guide_id}','${activity.fee_per_hour}', '${activity.media_url}')`,

      function (error, results, fields) {

        if (error) {

          return res.status(500).send({ status: "FAILED", message: "SERVER ERROR", data: error.message });

        } else {

          return res.status(201).send({ status: "OK", message: "TOUR ACTIVITY HAS BEEN CREATED SUCCESSFULLY", data: results });

        }

      });

  } catch (error) {

    console.log(error);

  }

};



const updateActivity = async (req, res) => {

  var activity = req.body;
  console.log(activity);

  try {

    connection.query(`UPDATE tour_activities SET title = '${activity.title}', description = '${activity.desc}', fee_per_hour = '${activity.fee_per_hour}', media_url = '${activity.media_url}' WHERE activity_id = '${req.params.activityID}'`,

      function (error, results, fields) {

        if (error) {

          return res.status(500).send({ status: "FAILED", message: "SERVER ERROR", data: error.message });

        } else {

          return res.status(204).send({ status: "OK", message: "TOUR GUIDE UPDATED SUCCESSFULLY", data: results });

        }

      });

  } catch (error) {

    console.log(error);

  }
};



const deleteActivity = async (req, res) => {

  console.log(req.user);

  try {

    connection.query(`DELETE FROM tour_activities WHERE activity_id = '${req.params.activityID}'`,

      function (error, results, fields) {

        if (error) {

          return res.status(500).send({ status: "FAILED", message: "SERVER ERROR", data: error.message });

        } else {

          return res.status(204).send({ status: "OK", message: "TOUR GUIDE DELETED SUCCESSFULLY", data: results });

        }

      });

  } catch (error) {

    console.log(error);

  }

}



module.exports = { getActivities, getActivity, createActivity, updateActivity, deleteActivity };
