import { Request, Response } from "express";
import xlsx from "xlsx";

// POST route to create XLSX file
export const createXlsx = async (
  req: Request,
  res: Response
): Promise<void> => {
  let quizData;

  // Parse the JSON data from the request body
  try {
    quizData = JSON.parse(req.body.quizData);
  } catch (error) {
    res.status(400).send("Invalid JSON data.");
    return;
  }

  // Create a new workbook
  const workbook = xlsx.utils.book_new();

  // Create a new worksheet
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
  quizData.forEach((row: any) => {
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

  // Convert array of arrays into a worksheet
  const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);

  // Append the worksheet to the workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, "Quiz Data");

  // Define the file name
  const fileName = "quiz_data.xlsx";

  // Save the workbook to a file
  xlsx.writeFile(workbook, fileName);

  // Send the file as a response
  res.download(fileName, (err) => {
    if (err) {
      res.status(500).send("Error downloading the file.");
    }
  });
};
