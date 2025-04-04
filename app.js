const express = require("express");
const cors = require("cors");
const dbConnection = require("./db/config");
require ("dotenv").config();

const app = express(); // Initialize express app instance
// Middlewares
const PORT = process.env.DB_PORT || 5000; // Set the port to listen on, default to 5000 if not specified in environment variables
app.use(express.json()); // Parse incoming request body in JSON format
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).send("Server is up and running");
})
const start = async () => {
  try {
    const result = await dbConnection.execute("select 'test' ");
    app.listen(PORT);
    console.log("Database connected successfully");
    console.log(`Listening to PORT: ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
};
start();

// Default route
app.get("/", async (req, res) => {
  res.send("Welcome");
});

// User route middleware file
const userRoute = require("./routes/userRoute");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require('./routes/answerRoute');
// const authMiddleware = require("./middleware/authMiddleware");

// users routes middleware 
app.use("/api/users", userRoute);

// questions routes middleware
app.use("/api", questionRoute);

// answers routes middleware
app.use('/api', answerRoute); 

// Endpoint to create tables in the database
app.get("/createTable", async (req, res) => {
  // SQL query to create the Users table
  let user_table = `CREATE TABLE IF NOT EXISTS userTable (
    user_id INT(30) AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (user_id) 
  )`;
  // SQL query to create the Questions table
  let question_table = `CREATE TABLE IF NOT EXISTS questionTable (
    id INT(30) NOT NULL AUTO_INCREMENT,
    question_id VARCHAR(120) NOT NULL UNIQUE,
    user_id INT(30) NOT NULL, 
    title VARCHAR(70) NOT NULL,
    question_description VARCHAR(300) NOT NULL,
    tag VARCHAR(40),
    PRIMARY KEY (id, question_id),
    FOREIGN KEY (user_id) REFERENCES userTable(user_id) ON DELETE CASCADE 
  )`; 

  // SQL query to create the Answers table
  let answer_table = `CREATE TABLE IF NOT EXISTS answerTable (
    answer_id INT(30) NOT NULL AUTO_INCREMENT,
    user_id INT(30) NOT NULL,
    question_id VARCHAR(120) NOT NULL,
    answer VARCHAR(300) NOT NULL,
    PRIMARY KEY (answer_id),
    FOREIGN KEY (user_id) REFERENCES userTable(user_id),
    FOREIGN KEY (question_id) REFERENCES questionTable(question_id) ON DELETE CASCADE 
  )`;

  // Execute each query and log whether the table was created successfully
  try {
    // Execute each query sequentially 
    await dbConnection.execute(user_table);
    await dbConnection.execute(question_table);
    await dbConnection.execute(answer_table);

    res.status(200).send("Tables created successfully");
  } catch (err) {
    console.log("Error creating tables:", err.message);
    res.status(500).send("Error creating tables");
  }
});

module.exports = app;


 