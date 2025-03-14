import express from 'express';
const app = express();
import cors from 'cors';
import {limiter} from './middlewares/rate-limit.middleware.js'
//middlewares
app.use(
    cors({
        origin: '*' || process.env.CORS_ORIGIN,
        credential: true 
    })
)
//common middleware
app.use(express.urlencoded({limit: "16kb", extended: true}));
app.use(express.json({limit: "16kb"}));
app.use(express.static("public"));
app.use(limiter);


// routes
import userRoute from './routes/user.route.js';
import mediaRoute from './routes/media.route.js';
app.use("/api/v1/user", userRoute);
app.use("/api/v1/media", mediaRoute);

export {app}