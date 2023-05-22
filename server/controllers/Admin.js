import Admin from "../models/AdminModel.js";
import Dish from "../models/Dishes.js";
import ErrorHandler from "../middleware/ErrorHandler.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Order from "../models/Order.js";


//get all the orders
export const getOrdersForAdmin = async (req, res, next) => {
  const {adminId} = req.params
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      throw new ErrorHandler(500, 'invalid admin id');
    }
    const orders = await Order.find({ restaurant: admin._id }).populate('dish', 'name price');;

    res.status(200).json({ message: 'here are the orders', orders });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(500,'error in fetching orders'))
  }
}

//accepting an order
export const acceptOrder = async (req, res, next) => {
  const { orderId } = req.params;
  try {
    // const admin = await Admin.findById(adminId)
    // if (!admin) {
    //   throw new ErrorHandler(500, 'invalid person to accept the order');
    // }
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: 'accepted' },
      { new: true }
    );
    if (!order) {
      throw new ErrorHandler(404, 'Order not found');
    }
    res.status(200).json({ message: 'Order accepted', order });
  } catch (error) {
    next(new ErrorHandler(500, 'Error accepting order'));
  }
};

//admin adding a dish
export const addDish = async (req, res,next) => {
  const { name, description, price} = req.body;
  const { adminId } = req.params;

  try {
    
    const admin = await Admin.findById(adminId);
    if (!admin) {
      throw new ErrorHandler(404, 'An admin not found');
    }

    const newDish = new Dish({
      name,
      description,
      price,
      restaurant: admin._id, // link the dish to the admin's restaurant
    });
    

    const savedDish = await newDish.save();

    admin.dishes.push(savedDish);
    await admin.save();

    res.status(201).json({ message: "Dish added successfully", dish: savedDish });
  } catch (error) {
    
    console.error(error);
    next(new ErrorHandler(error))
  }
};


//Admin register
export const register = async (req,res,next) => {
    try {
    const { userName, email, password, restaurant } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      throw new ErrorHandler(409, 'An admin with that email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      userName,
      email,
      password: hashedPassword,
      restaurant,
    });

    await newAdmin.save();

    
    return res.status(201).json({ message: 'Admin registered successfully',newAdmin });
        
    }
    catch (error) {
    next(new ErrorHandler(error.message));
  }
};

//LOGIN ADMIN
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    
    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw new ErrorHandler(401, 'Invalid email or password');
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      throw new ErrorHandler(401, 'Invalid email or password');
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    res.status(200).json({ token ,admin});
  } catch (error) {
    next(error);
  }
}






