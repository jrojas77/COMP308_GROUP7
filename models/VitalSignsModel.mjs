import { Schema, model } from "mongoose";

export const VitalSignsScheme = new Schema({
    bodyTemperature: Number,
    heartRate: Number,
    bloodPressure: Number,
    respirationRate: Number,
    weight: Number
}, {timestamps: true});

export const VitalSignsModel = model('VitalSigns', VitalSignsScheme);