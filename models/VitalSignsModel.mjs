import { Schema } from "mongoose";

export const VitalSignsScheme = new Schema({
    bodyTemperature: Number,
    heartRate: Number,
    bloodPressure: Number,
    respirationRate: Number,
    weight: Number
}, {timestamps: true});
