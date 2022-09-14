import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { address } from "ip";

const app = express();
const port = process.env.PORT || 3000;
const processId = process.pid;
const protocol = app.settings["trust proxy"] ? "https" : "http";

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => { res.status(200).json({ message: `Application running on ${protocol}://${req.hostname}:${port}` }); });

const server = app.listen(port, () => { console.log(`\nApplication running on ${protocol}://${address()}:${port}\n`); });

process.on("SIGINT", (signal) => {
	console.log(`APP (PID:${processId}) received ${signal}`);
	server.close(() => { process.exit(0); });
});
process.on("SIGTERM", (signal) => {
	console.log(`APP (PID:${processId}) received ${signal}`);
	server.close(() => { process.exit(0); });
});

process.on("uncaughtException", (error, origin) => {
	console.log(`APP (PID:${processId}) received ${origin}\n${error}`);
	server.close(() => { process.exit(1); });
	setTimeout(() => { process.exit(1); }, 1000).unref();
});
process.on("uncaughtException", (reason) => {
	console.log(`APP (PID:${processId}) received ${reason}`);
	server.close(() => { process.exit(1); });
	setTimeout(() => { process.exit(1); }, 1000).unref();
});