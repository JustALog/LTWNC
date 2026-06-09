import db from "../db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import type {
  Enrollment,
  CreateEnrollmentPayload,
  UpdateEnrollmentPayload,
} from "../types/enrollment";

export class EnrollmentModel {
  static async findAll(): Promise<Enrollment[]> {
    const sql =
      "SELECT e.*, s.SNAME, m.MNAME FROM STUDENT_ENROLLMENT e JOIN STUDENT s ON e.SID = s.SID JOIN MODULES m ON e.MID = m.MID";
    const [rows] = await db.query<RowDataPacket[]>(sql);
    return rows as Enrollment[];
  }

  static async findById(
    sid: string,
    mid: string,
    acadYear: string
  ): Promise<Enrollment | null> {
    const sql =
      "SELECT e.*, s.SNAME, m.MNAME FROM STUDENT_ENROLLMENT e JOIN STUDENT s ON e.SID = s.SID JOIN MODULES m ON e.MID = m.MID WHERE e.SID = ? AND e.MID = ? AND e.ACAD_YEAR = ?";
    const [rows] = await db.query<RowDataPacket[]>(sql, [sid, mid, acadYear]);
    if (rows.length === 0) return null;
    return rows[0] as Enrollment;
  }

  static async create(data: CreateEnrollmentPayload): Promise<Enrollment> {
    await db.query<ResultSetHeader>(
      "INSERT INTO STUDENT_ENROLLMENT (SID, MID, ACAD_YEAR) VALUES (?, ?, ?)",
      [data.SID, data.MID, data.ACAD_YEAR]
    );
    return (await EnrollmentModel.findById(
      data.SID,
      data.MID,
      data.ACAD_YEAR
    ))!;
  }

  static async update(
    sid: string,
    mid: string,
    acadYear: string,
    data: UpdateEnrollmentPayload
  ): Promise<Enrollment | null> {
    const [result] = await db.query<ResultSetHeader>(
      "UPDATE STUDENT_ENROLLMENT SET ? WHERE SID = ? AND MID = ? AND ACAD_YEAR = ?",
      [data, sid, mid, acadYear]
    );
    if (result.affectedRows === 0) return null;
    const newSid = data.SID ?? sid;
    const newMid = data.MID ?? mid;
    const newAcadYear = data.ACAD_YEAR ?? acadYear;
    return EnrollmentModel.findById(newSid, newMid, newAcadYear);
  }

  static async delete(
    sid: string,
    mid: string,
    acadYear: string
  ): Promise<boolean> {
    const [result] = await db.query<ResultSetHeader>(
      "DELETE FROM STUDENT_ENROLLMENT WHERE SID = ? AND MID = ? AND ACAD_YEAR = ?",
      [sid, mid, acadYear]
    );
    return result.affectedRows > 0;
  }
}
