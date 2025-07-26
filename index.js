import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import Joi from "joi";
import { initDB, pool } from "./db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

// 🔁 Clean undefined/null/empty-string values
const cleanObject = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  );

// ------------------ Admin Register ------------------
app.post("/api/admin/register", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
      error: error.details[0].message,
    });

  try {
    const { email, password } = req.body;
    const [exists] = await pool.query("SELECT id FROM admin WHERE email = ?", [
      email,
    ]);
    if (exists.length > 0)
      return res.status(409).json({
        success: false,
        message: "Admin already exists",
        error: "Admin already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = cleanObject({
      name: req.body.name,
      email,
      password: hashedPassword,
    });

    const fields = Object.keys(data);
    const placeholders = fields.map(() => "?").join(", ");
    const values = fields.map((k) => data[k]);
    const query = `INSERT INTO admin (${fields.join(
      ", "
    )}) VALUES (${placeholders})`;

    await pool.query(query, values);
    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
});

// ------------------ Admin Login ------------------
app.post("/api/admin/login", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
      error: error.details[0].message,
    });

  try {
    const { email, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM admin WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0)
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        error: "Invalid email or password",
      });

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch)
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        error: "Invalid email or password",
      });

    res.status(200).json({
      success: true,
      message: "Login successful",
      admin: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
});

// ------------------ Create Contact ------------------
app.post("/api/contact", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
      error: error.details[0].message,
    });

  try {
    const data = cleanObject({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });

    const fields = Object.keys(data);
    const placeholders = fields.map(() => "?").join(", ");
    const values = fields.map((k) => data[k]);
    const query = `INSERT INTO contact (${fields.join(
      ", "
    )}) VALUES (${placeholders})`;

    await pool.query(query, values);
    res.status(201).json({
      success: true,
      message: "Contact submitted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
});

// ------------------ Get All Contacts ------------------
app.get("/api/contact", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM contact");
    res.status(200).json({
      success: true,
      message: "Contacts fetched successfully",
      contacts: rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
});

// ------------------ Start Server ------------------
app.listen(port, async () => {
  await initDB();
  console.log(`🚀 Server running on http://localhost:${port}`);
});