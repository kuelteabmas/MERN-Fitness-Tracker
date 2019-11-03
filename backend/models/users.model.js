// import { Schema, Mongoose } from "mongoose";

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Data schema for user
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true, // timestamps for any update on user (creation, modified, etc)
})

const User = mongoose.model('User', userSchema)

module.exports = User