import dotenv from "dotenv";
import mongoose from "mongoose";
import { NurseModel } from "./models/NurseModel.mjs";
import { PatientModel } from "./models/PatientModel.mjs";

dotenv.config();

let arrayOfNurses = [
    {
        email: "zo@cewaje.il",
        password: "0319794786",
        firstName: "Albert",
        lastName: " Todd"
    },
    {
        email: "ole@jic.tz",
        password: "IAcgGnj8j6",
        firstName: "Marion",
        lastName: " Thompson"
    },
    {
        email: "la@wivkeb.tk",
        password: "OW2PnaQO1E",
        firstName: "Kyle",
        lastName: "Palmer"
    },
    {
        email: "wow@jatiduwef.nu",
        password: "P8NQYagJSG",
        firstName: "Ronald",
        lastName: "Doyle"
    },
    {
        email: "la@eha.jm",
        password: "UP15Y1eZws",
        firstName: "Albert",
        lastName: "Todd"
    }
];

let arrayOfPatients = [
    {
        email: "efdibufi@ensekto.ni",
        password: "CUEYUgCMjq",
        firstName: "Virginia",
        lastName: "Henry",
        dailyInformation: [
            { bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 25, respirationRate: 16, weight: 70 },
            { bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 25, respirationRate: 16, weight: 70 },
            { bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 25, respirationRate: 16, weight: 70 },
            { bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 25, respirationRate: 16, weight: 70 },
            { bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 25, respirationRate: 16, weight: 70 },
            { bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 25, respirationRate: 16, weight: 70 },
            { bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 25, respirationRate: 16, weight: 70 },
            { bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 25, respirationRate: 16, weight: 70 }
        ],
        vitalSignsInformation: [
            { bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 25, respirationRate: 16, weight: 70 },
            { bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 25, respirationRate: 16, weight: 70 },
            { bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 25, respirationRate: 16, weight: 70 },
            { bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 25, respirationRate: 16, weight: 70 },
            { bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 25, respirationRate: 16, weight: 70 },
            { bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 25, respirationRate: 16, weight: 70 },
            { bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 25, respirationRate: 16, weight: 70 },
            { bodyTemperature: 36, heartRate: 120, systolicBloodPresure: 30, diastolicBloodPresure: 25, respirationRate: 16, weight: 70 }
        ]
    },
    {
        email: "bewsoh@hisdirfi.mu",
        password: "a5W8zsO8cp",
        firstName: "Charlotte",
        lastName: "Armstrong"
    },
    {
        email: "cukfepte@nuvfov.ck",
        password: "jz5vfQjkhg",
        firstName: "Nathan",
        lastName: "Daniel"
    },
    {
        email: "golesrel@kopcon.vn",
        password: "2774011338",
        firstName: "Lora",
        lastName: "Cain"
    },
];

(async function () {
    try {
        // Connect to the MongoDB database
        const connection = await mongoose.connect(process.env.DB);

        // Create nurses and patients
        await NurseModel.create(arrayOfNurses);
        await PatientModel.create(arrayOfPatients);

                // Log confirmation message
                console.log("Nurses and patients successfully recorded in the database.");

                // Retrieve an example nurse and patient
                const exampleNurse = await NurseModel.findOne();
                const examplePatient = await PatientModel.findOne();
        
                // Log the example nurse and patient
                console.log("Example Nurse:", exampleNurse);
                console.log("Example Patient:", examplePatient);
        
        // Disconnect from the database
        mongoose.disconnect();

    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
