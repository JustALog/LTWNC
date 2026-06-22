import db from "../db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { User, CreateUserPayload, UserPublic } from "../types/user";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export class UserModel {
  static async create(data: CreateUserPayload): Promise<UserPublic> {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO USER_ACCOUNT (username, password) VALUES (?, ?)",
      [data.username, hashedPassword]
    );
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT id, username, created_at FROM USER_ACCOUNT WHERE id = ?",
      [result.insertId]
    );
    return rows[0] as UserPublic;
  }

  static async findByUsername(username: string): Promise<User | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM USER_ACCOUNT WHERE username = ?",
      [username]
    );
    if (rows.length === 0) return null;
    return rows[0] as User;
  }
}
