import db from "../db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import {
  Student,
  CreateStudentPayload,
  UpdateStudentPayload,
} from "../types/student";

export class StudentModel {
  static async findAll(): Promise<Student[]> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT s.*, t.TName AS TutorName FROM STUDENT s LEFT JOIN TUTOR t ON s.Tutor_Id = t.Tut_Id"
    );
    return rows as Student[];
  }

  static async findById(sid: string): Promise<Student | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT s.*, t.TName AS TutorName FROM STUDENT s LEFT JOIN TUTOR t ON s.Tutor_Id = t.Tut_Id WHERE s.SID = ?",
      [sid]
    );
    if (rows.length === 0) return null;
    return rows[0] as Student;
  }

  static async create(data: CreateStudentPayload): Promise<Student> {
    const insertData = { ...data };
    if (insertData.Tutor_Id === "") insertData.Tutor_Id = null;
    await db.query<ResultSetHeader>("INSERT INTO STUDENT SET ?", [insertData]);
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT s.*, t.TName AS TutorName FROM STUDENT s LEFT JOIN TUTOR t ON s.Tutor_Id = t.Tut_Id WHERE s.SID = ?",
      [data.SID]
    );
    return rows[0] as Student;
  }

  static async update(
    sid: string,
    data: UpdateStudentPayload
  ): Promise<Student | null> {
    const updateData = { ...data };
    if (updateData.Tutor_Id === "") updateData.Tutor_Id = null;
    const [result] = await db.query<ResultSetHeader>(
      "UPDATE STUDENT SET ? WHERE SID = ?",
      [updateData, sid]
    );
    if (result.affectedRows === 0) return null;
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT s.*, t.TName AS TutorName FROM STUDENT s LEFT JOIN TUTOR t ON s.Tutor_Id = t.Tut_Id WHERE s.SID = ?",
      [sid]
    );
    return rows[0] as Student;
  }

  static async delete(sid: string): Promise<boolean> {
    const [result] = await db.query<ResultSetHeader>(
      "DELETE FROM STUDENT WHERE SID = ?",
      [sid]
    );
    return result.affectedRows > 0;
  }
}
