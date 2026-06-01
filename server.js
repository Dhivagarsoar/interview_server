const express = require("express");
const cors = require("cors");

const app = express();

/*
-----------------------------------
MIDDLEWARE
-----------------------------------
*/

// app.use(
//   cors({
//     origin: "http://13.205.180.173:3000",
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://13.205.180.173:3000",
      "https://yourdomain.com",
    ],
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );
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
CHECK API
-----------------------------------
*/

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API working successfully",
  });
});

/*
-----------------------------------
SUBMIT INTERVIEW (WITHOUT DB)
-----------------------------------
*/

app.post("/submit-interview", (req, res) => {
  const {
    name,
    designation,
    interview_time,
  } = req.body;

  if (
    !name ||
    !designation ||
    !interview_time
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  res.json({
    success: true,
    message: "Interview submitted successfully",
    data: {
      name,
      designation,
      interview_time,
    },
  });
});

/*
-----------------------------------
GET ALL INTERVIEWS (DUMMY DATA)
-----------------------------------
*/

app.get("/interviews", (req, res) => {
  res.json([
    {
      id: 1,
      name: "John",
      designation: "DevOps Engineer",
      interview_time: "10:00 AM",
    },
    {
      id: 2,
      name: "David",
      designation: "Frontend Developer",
      interview_time: "11:00 AM",
    },
  ]);
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
