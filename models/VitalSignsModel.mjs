import { Schema, model } from "mongoose";

function DiastolicValidation(value){
    if (this.systolicBloodPresure > 0) {
        return this.systolicBloodPresure > value;
    }
    return true;
}

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
    diastolicBloodPresure: {
        type: Number,
        validate: {
            validator: DiastolicValidation
        }
    },
    respirationRate: Number,
    weight: {
        type: Number,
        min: 10
    }
}, { timestamps: true });

export const VitalSignsModel = model('VitalSigns', VitalSignsScheme);