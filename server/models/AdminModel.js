import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  restaurant: {
    type: String,
    required: true,
  },
  dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }]
});

const Admin = mongoose.model('AdminModel', AdminSchema);

export default Admin;