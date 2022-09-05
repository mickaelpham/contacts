import express from "express";
import morgan from "morgan";
import middleware from "./middleware";
import contactsRouter from "./routes/contacts";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use(middleware.errorHandler);

export default app;
