import bcrypt from "bcrypt";
import db from "../config/db.js";
import { removeUndefined } from "../utils/utils.js";

// Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { email, password, name,profile_image } = req.body;

    // Check if admin exists
    const [exists] = await db.query("SELECT id FROM admin WHERE email = ?", [
      email,
    ]);
    if (exists.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Admin already exists",
        error: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = removeUndefined({
      name,
      email,
      profile_image,
      password: hashedPassword,
    });

    const fields = Object.keys(data);
    const placeholders = fields.map(() => "?").join(", ");
    const values = fields.map((key) => data[key]);
    const query = `INSERT INTO admin (${fields.join(
      ", "
    )}) VALUES (${placeholders})`;

    await db.execute(query, values);

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: { name, email },
    });
  } catch (err) {
    console.error("Register Admin Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM admin WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
        error: "Admin not found",
      });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        error: "Invalid credentials",
      });
    }

    // Remove password before sending response
    const { password: _, ...sanitizedAdmin } = admin;

    // Optionally generate JWT:
    // const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: sanitizedAdmin,
      // token // uncomment if using token
    });
  } catch (err) {
    console.error("Login Admin Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Get Admins
export const getAdmin = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM admin");

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No admin found",
        error: "No admin found",
      });
    }

    // Remove password field from each admin
    const sanitizedAdmins = rows.map(({ password, ...rest }) => rest);

    res.status(200).json({
      success: true,
      message: "Admin retrieved successfully",
      data: sanitizedAdmins,
    });
  } catch (err) {
    console.error("Get Admin Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
