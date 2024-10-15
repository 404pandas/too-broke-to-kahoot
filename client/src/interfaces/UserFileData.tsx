export interface UserFileData {
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
