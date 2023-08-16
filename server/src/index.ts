import mongoose from 'mongoose';
import { logError, logInfo } from './services/logger';
import { MONGOOSE_CONNECTION_STRING } from './config';
import server from "./server"

// process exception handler
process.on("uncaughtException", (err, origin) => {
    logError(`${err.message} - unhandled error at - ${origin}`)
}).on("unhandledRejection", (reason, p) => {
    logError(`${reason} - unhandled rejection of promise - ${p}`)
})

// Mongoose
mongoose.set("returnOriginal", false);
mongoose.set("toJSON", { virtuals: true });
mongoose.set("toObject", { virtuals: true });
mongoose.connection.on("open", () => logInfo("Mongoose connection Success!"))
    .on('error', err => logError(err));
mongoose.connect(MONGOOSE_CONNECTION_STRING);


server.listen(80, () => {
    logInfo("Server is running on port 80")
})