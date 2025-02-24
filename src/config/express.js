import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import history from "connect-history-api-fallback";
import path from "path";
import swaggerConfig from "../swagger.js";
import express from "express";
import "dotenv/config";

export default function configExpress(app) {
  // Middlewares
  app.use(morgan("tiny"));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(fileUpload({ useTempFiles: true }));

  // Configuración de Swagger
  swaggerConfig(app);

  // Middleware para Vue (si usas Vue.js)
  app.use(history());
  app.use(express.static(path.join(__dirname, "public")));
}
