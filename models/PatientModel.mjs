import { Schema } from "mongoose";
import { VitalSignsScheme } from "./VitalSignsModel.mjs";
import { UserModel, options } from "./UserModel.mjs";

const PatientSchema = new Schema({
    dailyInformation: [VitalSignsScheme],
    vitalSignsInformation: [VitalSignsScheme]
}, options);

export const PatientModel = UserModel.discriminator('patient', PatientSchema);