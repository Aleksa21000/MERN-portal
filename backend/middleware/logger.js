import morgan from "morgan";

const logger = morgan(process.env.NODE_ENV === "production" ? "tiny" : "dev");

export default logger;
