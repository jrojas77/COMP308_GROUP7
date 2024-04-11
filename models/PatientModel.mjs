import { Schema } from "mongoose";
import { VitalSignsScheme } from "./VitalSignsModel.mjs";
import { UserModel, options } from "./UserModel.mjs";
import { SymptomsSchema } from "./SymptomsModel.mjs";

const PatientSchema = new Schema({
    dailyInformation: [VitalSignsScheme],
    vitalSignsInformation: [VitalSignsScheme],
    symptoms: [SymptomsSchema]
}, options);

export const PatientModel = UserModel.discriminator('patient', PatientSchema);