import { Router, Request, Response } from "express";
import db from "../db";

const router = Router();

// GET / : list all (optional ?SID=, ?MID=, ?ACAD_YEAR= filter)
router.get("/", async (req: Request, res: Response) => {
  try {
    const SID = req.query.SID as string | undefined;
    const MID = req.query.MID as string | undefined;
    const ACAD_YEAR = req.query.ACAD_YEAR as string | undefined;

    let sql = "SELECT * FROM STUDENT_ENROLLMENT";
    const params: string[] = [];
    const conditions: string[] = [];

    if (SID) {
      conditions.push("SID = ?");
      params.push(SID);
    }
    if (MID) {
      conditions.push("MID = ?");
      params.push(MID);
    }
    if (ACAD_YEAR) {
      conditions.push("ACAD_YEAR = ?");
      params.push(ACAD_YEAR);
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /:SID/:MID/:ACAD_YEAR : get one enrollment 
router.get("/:SID/:MID/:ACAD_YEAR", async (req: Request, res: Response) => {
  try {
    const { SID, MID, ACAD_YEAR } = req.params as Record<string, string>;
    const [rows]: any = await db.query(
      "SELECT * FROM STUDENT_ENROLLMENT WHERE SID = ? AND MID = ? AND ACAD_YEAR = ?",
      [SID, MID, ACAD_YEAR]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "Enrollment not found" });
      return;
    }
    res.json(rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST / : create enrollment
router.post("/", async (req: Request, res: Response) => {
  try {
    const { SID, MID, ACAD_YEAR } = req.body;

    if (!SID || !MID || !ACAD_YEAR) {
      res.status(400).json({ error: "SID, MID and ACAD_YEAR are required" });
      return;
    }

    await db.query(
      "INSERT INTO STUDENT_ENROLLMENT (SID, MID, ACAD_YEAR) VALUES (?, ?, ?)",
      [SID, MID, ACAD_YEAR]
    );
    res.status(201).json({ message: "Enrollment created" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /:SID/:MID/:ACAD_YEAR : update enrollment
router.put("/:SID/:MID/:ACAD_YEAR", async (req: Request, res: Response) => {
  try {
    const { SID, MID, ACAD_YEAR } = req.params as Record<string, string>;
    const fields = req.body as Record<string, any>;

    if (Object.keys(fields).length === 0) {
      res.status(400).json({ error: "No fields provided to update" });
      return;
    }

    const [result]: any = await db.query(
      "UPDATE STUDENT_ENROLLMENT SET ? WHERE SID = ? AND MID = ? AND ACAD_YEAR = ?",
      [fields, SID, MID, ACAD_YEAR]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Enrollment not found" });
      return;
    }

    res.json({ message: "Enrollment updated" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /:SID/:MID/:ACAD_YEAR : delete enrollment
router.delete("/:SID/:MID/:ACAD_YEAR", async (req: Request, res: Response) => {
  try {
    const { SID, MID, ACAD_YEAR } = req.params as Record<string, string>;
    const [result]: any = await db.query(
      "DELETE FROM STUDENT_ENROLLMENT WHERE SID = ? AND MID = ? AND ACAD_YEAR = ?",
      [SID, MID, ACAD_YEAR]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Enrollment not found" });
      return;
    }

    res.json({ message: "Enrollment deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
