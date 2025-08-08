import { Router } from "express";
import {
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctor,
  loginDoctor,
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByDoctorId,
  updateAppointment,
  deleteAppointment,
  getAvailableSlots,
  createDoctorAvailability,
  getAllDoctorAvailability,
  getAvailabilityByDoctorId,
  updateDoctorAvailability,
  deleteDoctorAvailability,
} from "../controllers/doctor.js";

const router = Router();

router.post("/createDoctor", createDoctor);
router.put("/updateDoctor/:id", updateDoctor);
router.delete("/deleteDoctor/:id", deleteDoctor);
router.get("/allDoctors", getAllDoctors);
router.get("/doctor/:id", getDoctor);
router.post("/loginDoctor", loginDoctor);

router.post("/appointments", createAppointment);
router.get("/appointments", getAllAppointments);
router.get("/appointments/:id", getAppointmentById);
router.get("/appointments/doctor/:doctor_id", getAppointmentsByDoctorId);
router.get("/appointments/available-slots/:doctor_id/:date", getAvailableSlots);
router.put("/appointments/:id", updateAppointment);
router.delete("/appointments/:id", deleteAppointment);

router.post("/createDoctorAvailability", createDoctorAvailability);
router.get("/getAllDoctorAvailability", getAllDoctorAvailability);
router.get("/getDoctorAvailability/:doctor_id", getAvailabilityByDoctorId);
router.put("/updateDoctorAvailability/:id", updateDoctorAvailability);
router.delete("/deleteDoctorAvailability/:id", deleteDoctorAvailability);

export default router;
