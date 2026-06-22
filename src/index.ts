import express from "express";
import "dotenv/config";
import studentRoutes from "./routes/students";
import enrollmentRoutes from "./routes/enrollments";
import cookieParser from 'cookie-parser';
import session from 'express-session';

const PORT: number = parseInt(process.env.PORT || "3000", 10);
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'products' }
}));
app.use(express.urlencoded({ extended: true }));
// Mount CRUD routes
app.use("/api/student", studentRoutes);
app.use("/api/enrollment", enrollmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
