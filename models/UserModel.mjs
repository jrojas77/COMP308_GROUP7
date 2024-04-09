import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export const options = { discriminatorKey: 'type' }

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [6, 'Min length of password is 6'],
    },
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
}, options);

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const isAuth = await bcrypt.compare(password, user.password);
        if (isAuth) {
            return user;
        }
        throw Error('Incorrect password')
    }
    else {
        throw Error('Incorrect email')
    }
}

export const UserModel = model('user', UserSchema)