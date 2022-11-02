import mongoose from "mongoose";
import {IpVerificationType} from "../../types/sessionTypes";

const ipVerificationSchema = new mongoose.Schema<IpVerificationType>({
    ip: String,
    endpoint: String,
    connectionAt: Number,
    isBlocked: Boolean,
    blockedDate: Number || null
});

export const IpVerificationModelClass = mongoose.model("ipVerification", ipVerificationSchema)
