import mongoose from "mongoose";
import ErrorHandler from "../middleware/ErrorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import Dish from "../models/Dishes.js";
import Order from "../models/Order.js";
import Admin from "../models/AdminModel.js";


//get all the orders placed by the user.
export const getAllOrdersUser = async (req, res,next) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).populate('dish', 'name price');
    const dish = 
    res.json(orders);
  } catch (error) {
    console.error(error);
    next(new ErrorHandler(500, error.message));
  }
}

//get a single dish
// export const singleDish = async (req, res, next) => {
//   const { restroId, dishId } = req.params;
//   try {
//     const dish = await Dish.findOne({ _id: dishId, restaurant: restroId }); // Filter by dishId and restroId
//     if (!dish) {
//       return res.status(404).json({ error: "Dish not found" });
//     }
//     res.json(dish);
//   } catch (error) {
//     console.log(error);
//     next(new ErrorHandler(500, "Error placing order"));
//   }
// };
//get all dishes of a spcefic restro
export const allDishesOfARestro = async (req, res, next) => {
  const { restroId } = req.params;
  try {
    const dishes = await Dish.find({ restaurant: restroId });
    res.json(dishes);
  } catch (error) {
    next(new ErrorHandler(error));
  }
};

//get all the restraunts
export const getRestro = async (req, res, next) => {
  try {
    const admins = await Admin.find({});
    //const restaurants = admins.map(admin => admin.restaurant);
    res.json(admins);
  } catch (error) {
    next(new ErrorHandler(error));
  }
};


//ordering food

export const placeOrder = async (req, res, next) => {
  const { userId, dishId } = req.params;

  try {
    const user = await User.findById(userId);
    console.log(`User: ${user.userName}`);
    if (!user) {
      throw new ErrorHandler(404, "user not found");
    }
    const dish = await Dish.findById(dishId);
    console.log(dish);
    if (!dish) {
      throw new ErrorHandler(404, "Dish not found");
    }

    // Check if the restaurant exists
    const restaurant = await Admin.findById(dish.restaurant);
    if (!restaurant) {
      throw new ErrorHandler(404, "Restaurant not found");
    }

    // Create the order
    const order = new Order({
      user: user._id,
      dish: dish._id,
      restaurant: restaurant._id,
    });
    await order.save();

    return res.status(201).json({ message: "Order placed successfully" ,order});
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(500, "Error placing order"));
  }
};

export const register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ErrorHandler(409, "An user with that email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User registered successfully", newUser });
  } catch (error) {
    next(new ErrorHandler(error.message));
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ErrorHandler(401, "Invalid email or password");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new ErrorHandler(401, "Invalid email or password");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000 // Cookie expires after 1 hour
    }).status(200).json({ token, user });

    
  } catch (error) {
    next(new ErrorHandler(error));
  }
};

//logout a user
export const logout = (req, res) => {
  res.clearCookie('authToken').send('Logged out successfully');
};

