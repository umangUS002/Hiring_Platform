import 'dotenv/config'
import express from "express";
import connectDB from "./configs/db.js";
import authRouter from "./routes/authRoutes.js";
import cors from "cors"
import referralRouter from "./routes/referralRoutes.js";

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/api/auth", authRouter);
app.use("/api/referral", referralRouter);
// app.use("/api/recruiter", recruiterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})