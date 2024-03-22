import { Schema, model } from "mongoose";

export const VitalSignsScheme = new Schema({
    bodyTemperature: {
        type: Number,
        min: [30, 'Less than 30 is not allowed'],
        max: [50, 'More than 50 is not allowed']
    },
    heartRate: {
        type: Number,
        min: 50,
        max: 250
    },
    systolicBloodPresure: Number,
    diastolicBloodPresure: Number,
    respirationRate: Number,
    weight: Number
}, {timestamps: true});

export const VitalSignsModel = model('VitalSigns', VitalSignsScheme);