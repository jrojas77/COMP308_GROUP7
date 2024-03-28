import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connection = await mongoose.connect(DB);

let arrayOfNurses = [];
