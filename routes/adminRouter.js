import { Router } from "express";
import { getAdmin, loginAdmin, registerAdmin } from "../controllers/admin.js";
const router = Router();

router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/getAdmin", getAdmin);
export default router;
