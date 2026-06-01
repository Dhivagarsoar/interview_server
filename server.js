const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const app = express();

/*
-----------------------------------
MIDDLEWARE
-----------------------------------
*/

app.use(cors());
app.use(express.json());

/*
-----------------------------------
WELCOME API
-----------------------------------
*/

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Interview Management API",
  });
});

/*
-----------------------------------
CHECK DATABASE CONNECTION
-----------------------------------
*/

app.get("/check-db", (req, res) => {
  db.query("SELECT 1", (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }

    res.json({
      success: true,
      message: "Database connected successfully",
    });
  });
});

/*
-----------------------------------
SUBMIT INTERVIEW
-----------------------------------
*/

app.post("/submit-interview", (req, res) => {
  const { name, designation, interview_time } = req.body;

  /*
  VALIDATION
  */

  if (!name || !designation || !interview_time) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  /*
  INSERT QUERY
  */

  const sql = `
    INSERT INTO interviews
    (name, designation, interview_time)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [name, designation, interview_time],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Failed to submit interview",
        });
      }

      res.json({
        success: true,
        message: "Interview submitted successfully",
      });
    }
  );
});

/*
-----------------------------------
GET ALL INTERVIEWS
-----------------------------------
*/

app.get("/interviews", (req, res) => {
  const sql = `
    SELECT *
    FROM interviews
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch interviews",
      });
    }

    res.json(result);
  });
});

/*
-----------------------------------
START SERVER
-----------------------------------
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});