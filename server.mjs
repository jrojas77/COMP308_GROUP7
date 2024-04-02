import express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import { createHandler } from "graphql-http/lib/use/express";
import { usersSchema } from "./graphql/GraphQLRoute.mjs";
import { expressjwt } from "express-jwt";

const PORT = process.env.PORT || 4000;
const DB = process.env.DB;
const JWT_SECRET = process.env.JWT_SECRET;

const connection = mongoose.connect(DB);
mongoose.connection.on("error", (err) => {
  console.log(err);
});

const auth = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  credentialsRequired: false,
  requestProperty: "user",
});

const app = express();
app.use(cors());
app.use(json());
app.use(auth);

app.use(
  "/graphql",
  createHandler({
    schema: usersSchema,
    context: async (req) => {
      const user = req.raw.user;
      return { user };
    },
    formatError: (error) => {
      console.error(error);
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server Running in port ${PORT}`);
});
