import cors from "cors";

const corsHandler = cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
});

export default corsHandler;
