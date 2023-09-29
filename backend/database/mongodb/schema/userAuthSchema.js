import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Username: String,
    Email: {
        type: String,
        unique: false,
        required: false},
    Password: {
        type: String,
        unique: false,
        required: false
    }
})

export default UserSchema;