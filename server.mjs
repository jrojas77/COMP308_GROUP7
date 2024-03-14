import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { createHandler } from "graphql-http";
import { usersSchema } from "./graphql/GraqphQLRoute.mjs";

const PORT = process.env.PORT || 4000;
const DB = process.env.DB;

const connection = mongoose.connect(DB);
mongoose.connection.on("error", (err) => {
    console.log(err);
});

const app = express();
app.use(cors());
app.use(json());

app.all('/graphql', createHandler({ 
    schema: usersSchema,
    formatError: (error) => {
        console.error(error);
    }
}));

app.listen(PORT, () => {
    console.log(`Server Running in port ${PORT}`);
});
