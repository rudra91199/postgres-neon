import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.join(process.cwd(),".env")
});

const config = {
    postgresUrl: process.env.POSTGRES_URL || "",
    port: process.env.PORT || 5000,
    secret: process.env.JWT_SECRET || "default_secret",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "default_refresh_secret"
}

export default config;