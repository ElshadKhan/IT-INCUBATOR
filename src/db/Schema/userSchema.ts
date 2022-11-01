import mongoose from "mongoose";
import {UserAccountDBType} from "../../types/userTypes";

const userSchema = new mongoose.Schema<UserAccountDBType>({
    id: String,
    accountData: {
        userName: String,
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

export const UserModel = mongoose.model("users", userSchema)
