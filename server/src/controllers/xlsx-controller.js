import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface WorksheetData {
    question: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    timeLimit: number;
    correctAnswers: string;
}

export class Xlsx {
    private workbook: xlsx.WorkBook;

    constructor() {
        this.workbook = xlsx.utils.book_new();
    }

    public addWorksheet(sheetName: string, data: WorksheetData[]): void {
        const worksheetData: (string | number)[][] = [
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

        data.forEach(row => {
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

        const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);
        xlsx.utils.book_append_sheet(this.workbook, worksheet, sheetName);
    }

    public save(filePath: string): void {
        xlsx.writeFile(this.workbook, filePath);
    }

    // You can add more methods as needed
}
