import mongoose from "mongoose";
import {UserAccountDBType} from "../../types/userTypes";

const userSchema = new mongoose.Schema<UserAccountDBType>({
    id: String,
    accountData: {
        userName: {type: String, required: true},
        email: String,
        passwordHash: String,
        passwordSalt: String,
        createdAt: String,
    },
    emailConfirmation: {
        confirmationCode: String,
        expirationDate: Date,
        isConfirmed: Boolean
    },
    passwordConfirmation: {
        confirmationCode: String,
        expirationDate: Date,
        isConfirmed: Boolean
    }
});

export const UserModelClass = mongoose.model("users", userSchema)
