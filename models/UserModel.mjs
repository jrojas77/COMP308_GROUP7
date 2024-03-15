import { Model, Schema, model } from "mongoose";

export const options = {discriminatorKey: 'type'}

const UserSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    password: String
}, options);


export const UserModel = model('user', UserSchema)