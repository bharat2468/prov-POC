import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

//? CORS config
const corsOptions = {
	origin: process.env.ALLOWED_ORIGINS,
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
};

app.use(cors(corsOptions));

//? cookie parser config to read cookies
app.use(cookieParser());

//? config for data recieved in the requests
app.use(express.json({ limit: "160kb" }));
app.use(express.urlencoded({ extended: true, limit: "160kb" }));
app.use(express.static("public"));

// !routes import
import userRoutes from "./routes/user.routes.js";
import workerRoutes from "./routes/worker.routes.js"
import schemeRoutes from "./routes/scheme.routes.js"


// !routes declare
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/worker", workerRoutes);
app.use("/api/v1/scheme", schemeRoutes);

app.use(errorMiddleware);

export { app };
