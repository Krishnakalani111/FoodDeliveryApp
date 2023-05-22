import express from "express"
import { acceptOrder, addDish, getOrdersForAdmin, login, register } from "../controllers/Admin.js";

const router = express.Router();
router.post("/registerAdmin", register);
router.post("/loginAdmin", login);
router.post("/:adminId", addDish)
router.get("/orders/:adminId", getOrdersForAdmin)
router.put("/acceptOrder/:orderId",acceptOrder)

export default router