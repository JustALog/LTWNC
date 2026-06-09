export interface Student {
  SID: string;
  SNAME: string;
  EMAIL: string;
  Tutor_Id: string | null;
  TutorName: string | null;
}

export interface CreateStudentPayload {
  SID: string;
  SNAME: string;
  EMAIL: string;
  Tutor_Id?: string | null;
}

export type UpdateStudentPayload = Partial<Pick<Student, "SNAME" | "EMAIL" | "Tutor_Id">>;
