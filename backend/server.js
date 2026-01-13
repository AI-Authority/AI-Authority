import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/AuthRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import paymentRoutes from "./routes/Payment.js";
import membershipRoutes from "./routes/MembershipRoutes.js";
import trainerCourseRoutes from "./routes/trainerCourseRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import courseEnrollmentRoutes from "./routes/courseEnrollmentsRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const allowedOrigins = [
  "https://www.ai-authority.ai",
  "https://ai-authority.ai",
  "https://ai-authority.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);

app.use("/api/certificates", certificateRoutes);
app.use("/certificates", certificateRoutes);

app.use("/api/membership", membershipRoutes);
app.use("/membership", membershipRoutes);

app.use("/api/payment", paymentRoutes);
app.use("/payment", paymentRoutes);

app.use("/api", trainerCourseRoutes);
app.use("/", trainerCourseRoutes);

app.use("/api/enrollment", courseEnrollmentRoutes);
app.use("/enrollment", courseEnrollmentRoutes);

app.use("/api/assessment", assessmentRoutes);
app.use("/assessment", assessmentRoutes);

app.use("/api/email", emailRoutes);
app.use("/email", emailRoutes);

app.use("/api/coupons", couponRoutes);
app.use("/coupons", couponRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
