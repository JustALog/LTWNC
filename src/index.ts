import express from "express";
import "dotenv/config";
import studentRoutes from "./routes/students";

const PORT: number = parseInt(process.env.PORT || "3000", 10);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Mount CRUD routes
app.use("/api/student", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
