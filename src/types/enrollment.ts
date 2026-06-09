export interface Enrollment {
  SID: string;
  MID: string;
  ACAD_YEAR: string;
  SNAME: string;
  MNAME: string;
}

export interface CreateEnrollmentPayload {
  SID: string;
  MID: string;
  ACAD_YEAR: string;
}

export type UpdateEnrollmentPayload = Partial<
  Pick<Enrollment, "SID" | "MID" | "ACAD_YEAR">
>;
