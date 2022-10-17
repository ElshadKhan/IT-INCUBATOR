export const settings = {
    MONGODB_URL: process.env.MONGODB_URL || "",
    ACCESS_JWT_TOKEN_SECRET: process.env.ACCESS_JWT_SECRET || "A",
    REFRESH_JWT_TOKEN_SECRET: process.env.REFRESH_JWT_SECRET || "B"
}