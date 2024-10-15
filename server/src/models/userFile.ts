import { DataTypes, Sequelize, Model, SaveOptions } from "sequelize";
import xlsx from "xlsx";

interface WorksheetData {
  id?: number;
  fileName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  timeLimit: number;
  correctAnswers: string;
}

export class UserFile extends Model<WorksheetData> implements WorksheetData {
  public id!: number;
  public fileName!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public question!: string;
  public answer1!: string;
  public answer2!: string;
  public answer3!: string;
  public answer4!: string;
  public timeLimit!: number;
  public correctAnswers!: string;

  private workbook: xlsx.WorkBook;

  constructor(values?: WorksheetData, options?: any) {
    super(values, options);
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

    data.forEach((row) => {
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

  public override async save(
    options?: SaveOptions<WorksheetData>
  ): Promise<this> {
    return super.save(options);
  }

  public saveFile(filePath: string): void {
    xlsx.writeFile(this.workbook, filePath);
  }
}

export function UserFileFactory(sequelize: Sequelize): typeof UserFile {
  UserFile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer3: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer4: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timeLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      correctAnswers: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "xlsx_files",
      sequelize,
      timestamps: true,
      hooks: {},
    }
  );

  return UserFile;
}
