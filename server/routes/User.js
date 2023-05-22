import express from "express";
import {
  register,
  login,
  placeOrder,
  getRestro,
  allDishesOfARestro,
 
  getAllOrdersUser,
  logout,
} from "../controllers/User.js";
import verifyToken from "../middleware/VerifyToken.js";

const router = express.Router();


router.post("/orderPlace/:userId/:dishId", placeOrder);
router.post("/registerUser", register);
router.post("/loginUser", login);
router.get("/restraunts", getRestro);
router.get("/:restroId", allDishesOfARestro);
//router.get("/:restroId/:dishId", singleDish);
router.get("/orders/:userId", getAllOrdersUser);
router.post("/logoutUser",logout)
export default router;
