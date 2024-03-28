import dotenv from "dotenv";
import { UserModel } from "../models/UserModel.mjs";
import { connect, disconnect } from "mongoose";

dotenv.config();

describe('User Model',
    function () {
        let connection;

        before(async function () {
            connection = await connect(process.env.DB);
        });

        after(async function () {
            await disconnect();
        });


        it('Should Create a User if a valid email, password, first name, last name',
            function (done) {
                let correctUser = new UserModel({ email: "jhon.doe@gmail.com", password: "123456", firstName: "Jhon", lastName: "Doe" });;
                correctUser.save().then(async () => { await UserModel.findByIdAndDelete(correctUser._id) }).then(done).catch(done);
            }
        );
    }
);