import { connect, disconnect } from "mongoose";
import { VitalSignsModel } from "../models/VitalSignsModel.mjs";
import should from "should";

import dotenv from "dotenv";

dotenv.config();

describe(
    'Vital Signs',
    function () {

        let connection;

        before(async function () {
            connection = await connect(process.env.DB);
        });

        after(async function () {
            await disconnect();
        })

        it('Should Create Correctly a new Vital Signs Entry',
            function (done) {
                let newVitalSigns = new VitalSignsModel({ bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 25, respirationRate: 16, weight: 70 });
                newVitalSigns.save().then(async (val) => {
                    let insertedVitalSign = await VitalSignsModel.findByIdAndDelete(newVitalSigns._id);
                }).then(done).catch(done);
            }
        ).timeout(10000);

        it('Should not create a Vital Signs entry with diastolic Blood Presure above Systolic Blood Pressure',
            function (done) {
                let newVitalSings = new VitalSignsModel({ bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 31, respirationRate: 16, weight: 70 })
                newVitalSings.validate().then(() => { done("Validation Failed"); }).catch(() => { done(); });
            });
    }
);