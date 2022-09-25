import mongoose from "mongoose";
import SECRETS from "../config.js";

export const connect = (url = SECRETS.MONGODB_CONNECTION_STRING) => {
  return mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};
