// Third party modules
// Import the Express.js module
//  Third-party package 'express' allows us to create a web server
const express = require("express");
// Import the xlsx module
//  Third-party package 'xlsx' allows us to read and write Excel files
const xlsx = require("xlsx");

// local modules
// Import the fs module
//  Built-in Node.js package 'fs' allows us to work with the file system
const fs = require("fs");
// Import the path module
//  Built-in Node.js package 'path' resolves path of files that are located on the server
const path = require("path");
// Initializes an instance of Express.js

const app = express();
// Defines which port the Express.js server will run
const PORT = 3000;

// Middleware to serve static files from the 'public' directory
// app.use is a method in Express.js that allows us to use middleware
app.use(express.static("public"));

// Middleware to parse URL-encoded data (for form submission)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data
// app.post is a method in Express.js that allows us to handle POST requests
app.post("/create-xlsx", (req, res) => {
  // Variable to hold the parsed JSON data
  let quizData;

  // Parse the JSON data
  try {
    // If the JSON data is valid, parse it
    quizData = JSON.parse(req.body.quizData);
  } catch (error) {
    // If the JSON data is invalid, send a 400 status code
    return res.status(400).send("Invalid JSON data.");
  }

  // Create a new workbook
  // xlsx.utils.book_new() creates a new workbook
  const workbook = xlsx.utils.book_new();

  // Create a new worksheet
  // xlsx.utils.aoa_to_sheet() converts an array of arrays to a worksheet
  const worksheetData = [
    [
      "Question - max 120 characters",
      "Answer 1 - max 75 characters",
      "Answer 2 - max 75 characters",
      "Answer 3 - max 75 characters",
      "Answer 4 - max 75 characters",
      "Time limit (sec)",
      "Correct answer(s)",
    ],
  ];

  // Add quiz data rows
  // Iterates over the quizData array and push each row to the worksheetData array
  // forEach() is a method in JavaScript that allows us to iterate over an array
  quizData.forEach((row) => {
    // push() is a method in JavaScript that allows us to add elements to an array
    worksheetData.push([
      row.question,
      row.answer1,
      row.answer2,
      row.answer3,
      row.answer4,
      row.timeLimit,
      row.correctAnswers,
    ]);
  });

  // Convert the worksheet data to a worksheet
  // xlsx.utils.aoa_to_sheet() converts an array of arrays to a worksheet
  const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);

  // Append the worksheet to the workbook
  // xlsx.utils.book_append_sheet() appends a worksheet to a workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, "Quiz");

  // Define the output path
  // path.join() resolves the path of the file
  // __dirname is a global object in Node.js that represents the directory name of the current module
  // "quiz_template.xlsx" is the name of the file
  const filePath = path.join(__dirname, "quiz_template.xlsx");

  // Write the workbook to a file
  // xlsx.writeFile() writes the workbook to a file
  xlsx.writeFile(workbook, filePath);

  // Send the file to the client
  // res.download() sends the file to the client for download
  res.download(filePath, (err) => {
    if (err) {
      // If there is an error, log the error and send a 500 status code
      console.error("Error while sending the file:", err);
      res.status(500).send("Error generating file");
    } else {
      // Remove the file after sending it
      // fs.unlinkSync() deletes the file
      // this is needed to prevent the server from getting cluttered with old files
      fs.unlinkSync(filePath);
    }
  });
});

// Starts the Express.js server
// Express.js' listen() method is responsible for listening for incoming connections on the specified port

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} at http://localhost:${PORT}`);
});
