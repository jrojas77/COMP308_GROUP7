import mongoose, { Schema } from "mongoose";
import { UserModel, options } from "./UserModel.mjs";

const NurseSchema = new Schema({
    
}, options);

export const NurseModel = UserModel.discriminator('nurse', NurseSchema);