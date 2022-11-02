import mongoose from "mongoose";
import {RefreshToken} from "../../types/userTypes";

const tokenFromBlackListSchema = new mongoose.Schema<RefreshToken>({
    refreshToken: String
});

export const tokenFromBlackListModel = mongoose.model("blackListOfRefreshToken", tokenFromBlackListSchema)
