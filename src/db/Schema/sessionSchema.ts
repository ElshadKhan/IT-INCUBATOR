import mongoose from "mongoose";
import {SessionDBType} from "../../types/sessionTypes";

const sessionSchema = new mongoose.Schema<SessionDBType>({
    ip: String,
    title: String,
    lastActiveDate: String,
    expiredDate: String,
    deviceId: String,
    userId: String,
});

export const SessionModel = mongoose.model("sessions", sessionSchema)
