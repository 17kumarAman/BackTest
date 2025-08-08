import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import express from "express";
import adminRouter from "./routes/adminRouter.js";
import contactRouter from "./routes/contactRouter.js";
import doctorRouter from "./routes/doctorRouter.js";
import appointmentRouter from "./routes/appointment.js"
import sheduleRouter from "./routes/shedulRouter.js"

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api", adminRouter);
app.use("/api", contactRouter);
app.use("/api", doctorRouter);
app.use("/api", appointmentRouter);
app.use("/api", sheduleRouter);

// JSON aur URL-encoded body ke liye
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload ke liye
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    // console.log('coonected');
  } catch (error) {
    console.log(error);
  }
};

// ------------------ Start Server ------------------
app.listen(port, () => {
  cloudinaryConnect()
  console.log(`🚀 Server running on http://localhost:${port}`);
});
