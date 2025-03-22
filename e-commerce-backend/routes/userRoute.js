import express from "express";
import { loginUser, registerUser, adminLogin, addToCart, fetchCart } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/addToCart', addToCart);
userRouter.post('/fetchCart', fetchCart);

export default userRouter;