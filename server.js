import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import { connect } from "./resources/utils/db.js";
import SECRETS from "./resources/config.js";
//Router Import
import IndexRouter from "./resources/routes/index.js";

//Declaratons
const app = express();
const PORT = SECRETS.PORT || 80;

//Middleware
app.use(json());
app.use(cors());
app.use(morgan("dev"));

//Routes
const successStringCSS =
  "display: flex; justify-content: center; flex-direction: column; align-items: center;";
const successString = `<div style=${successStringCSS}><h1><i>Server is Running!</i></h1><p>CI/CD Pipeline working via Github Actions<p></div>`;

app.get("/", (req, res) => res.status(200).send(successString));
app.use("/api", IndexRouter);

//Error Handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).send({ status, message });
});

const start = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      if (SECRETS.NODE_ENV === "development") {
        console.log(`REST API on http://localhost:${PORT}/`);
      }
    });
  } catch (err) {
    console.error(err, "This is the error in starting the server");
  }
};
start();
