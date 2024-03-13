import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserModel } from "./models/UserModel.mjs";
import { PatientModel } from "./models/PatientModel.mjs";
import { NurseModel } from "./models/NurseModel.mjs";

const PORT = process.env.PORT || 4000;
const DB = process.env.DB;

const connection = mongoose.connect(DB);

const app = express();
app.use(cors());
app.use(json());

app.get('/users', async(req, res, next) => {
    let users = await UserModel.find();
    res.json(users);
});

app.post('/users', async (req, res, next) => {
    try {

        let { type, email, password, firstName, lastName } = req.body;
        if (type == 'patient') {
            let newPatient = new PatientModel({email, password, firstName, lastName});
            await newPatient.save();
            res.sendStatus(200);
            return;
        }
        let newNurse = new NurseModel({email, password, firstName, lastName});
        await newNurse.save();
        res.sendStatus(200);
    }
    catch (err) {
        res.sendStatus(400);
        console.error(err);
        return;
    }
});

app.listen(PORT, () => {
    console.log(`Server Running in port ${PORT}`);
});
