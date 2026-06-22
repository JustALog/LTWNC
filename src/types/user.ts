export interface User {
  id: number;
  username: string;
  password: string; // bcrypt hashed
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserPayload {
  username: string;
  password: string; // plaintext — will be hashed by the model
}

/** Returned to client — never expose the password hash */
export interface UserPublic {
  id: number;
  username: string;
  created_at: Date;
}
