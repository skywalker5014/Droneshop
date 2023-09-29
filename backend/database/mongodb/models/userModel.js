import mongoose from "mongoose";
import UserSchema from "../schema/userAuthSchema.js";

const User = mongoose.model('User', UserSchema);

export default User;