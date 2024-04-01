import { connect, disconnect } from "mongoose";
import { VitalSignsModel } from "../models/VitalSignsModel.mjs";

import dotenv from "dotenv";

dotenv.config();

describe("Vital Signs", function () {
  let connection;

  before(async function () {
    connection = await connect(process.env.DB);
  });

  after(async function () {
    await disconnect();
  });

  it("Should Create Correctly a new Vital Signs Entry", function (done) {
    let newVitalSigns = new VitalSignsModel({
      bodyTemperature: 36,
      heartRate: 120,
      systolicBloodPressure: 30,
      diastolicBloodPressure: 25,
      respirationRate: 16,
      weight: 70,
    });
    newVitalSigns
      .save()
      .then(async (val) => {
        let insertedVitalSign = await VitalSignsModel.findByIdAndDelete(
          newVitalSigns._id
        );
      })
      .then(done)
      .catch(done);
  }).timeout(10000);

  it("Should not create a Vital Signs entry with diastolic Blood Pressure above Systolic Blood Pressure", function (done) {
    let newVitalSigns = new VitalSignsModel({
      bodyTemperature: 36,
      heartRate: 120,
      systolicBloodPressure: 30,
      diastolicBloodPressure: 31,
      respirationRate: 16,
      weight: 70,
    });
    newVitalSigns
      .validate()
      .then(() => {
        done("Validation Failed");
      })
      .catch(() => {
        done();
      });
  });

  it("Should not create a Vital Signs entry when Body Temperature out of range", function (done) {
    let newVitalSigns = new VitalSignsModel({
      bodyTemperature: 70,
      heartRate: 120,
      systolicBloodPressure: 30,
      diastolicBloodPressure: 25,
      respirationRate: 16,
      weight: 70,
    });
    newVitalSigns
      .validate()
      .then(() => {
        done("Validation Failed");
      })
      .catch(() => {
        done();
      });
  });

  it("Should not create a Vital Signs entry with heart rate out of range", function (done) {
    let newVitalSigns = new VitalSignsModel({
      bodyTemperature: 36,
      heartRate: 300,
      systolicBloodPressure: 30,
      diastolicBloodPressure: 25,
      respirationRate: 16,
      weight: 70,
    });
    newVitalSigns
      .validate()
      .then(() => {
        done("Validation Failed");
      })
      .catch(() => {
        done();
      });
  });

  it("Should not create a Vital Signs entry with weight below 5", function (done) {
    let newVitalSigns = new VitalSignsModel({
      bodyTemperature: 36,
      heartRate: 120,
      systolicBloodPressure: 30,
      diastolicBloodPressure: 25,
      respirationRate: 16,
      weight: 0,
    });
    newVitalSigns
      .validate()
      .then(() => {
        done("Validation Failed");
      })
      .catch(() => {
        done();
      });
  });
});
