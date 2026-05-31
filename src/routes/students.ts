import { Router, Request, Response } from "express";
import db from "../db";

const router = Router();

// GET / — list all students
router.get("/", async (_req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM STUDENT");
    res.json(rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /:id — get student by SID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query("SELECT * FROM STUDENT WHERE SID = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      res.status(404).json({ error: "Student not found" });
      return;
    }
    res.json(rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST / — create student 
router.post("/", async (req: Request, res: Response) => {
  try {
    const payload = { ...req.query, ...req.body } as Record<string, any>;
    const { SID, SNAME, EMAIL, Tutor_Id } = payload;
    if (!SID || !SNAME || !EMAIL) {
      res.status(400).json({ error: "SID, SNAME and EMAIL are required" });
      return;
    }
    const [result] = await db.query("INSERT INTO STUDENT SET ?", {
      SID,
      SNAME,
      EMAIL,
      Tutor_Id: Tutor_Id ?? null,
    });
    res.status(201).json({ message: "Success !" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /:id — update student
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const fields = { ...req.query, ...req.body } as Record<string, any>;
    if (Object.keys(fields).length === 0) {
      res.status(400).json({ error: "No fields provided to update" });
      return;
    }
    const [result]: any = await db.query("UPDATE STUDENT SET ? WHERE SID = ?", [
      fields,
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Student not found" });
      return;
    }
    res.json({ message: "Student updated" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /:id — delete student
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const [result]: any = await db.query("DELETE FROM STUDENT WHERE SID = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Student not found" });
      return;
    }
    res.json({ message: "Student deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
