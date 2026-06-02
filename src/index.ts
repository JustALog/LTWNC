import express from "express";
import "dotenv/config";
import studentRoutes from "./routes/students";
import enrollmentRoutes from "./routes/enrollments";

const PORT: number = parseInt(process.env.PORT || "3000", 10);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Mount CRUD routes
app.use("/api/student", studentRoutes);
app.use("/api/enrollment", enrollmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
