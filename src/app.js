import express from "express";
import morgan from "morgan";
import "module-alias/register";
import cors from "cors";
import fileUpload from "express-fileupload";
import history from "connect-history-api-fallback";
import path from "path";
import "dotenv/config"; // Usa esta forma si trabajas con import

const app = express();

// Middlewares
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

// Middleware para Vue
app.use(history());
app.use(express.static(path.join(__dirname, "public")));

// Importa las rutas usando los alias
import consultorioRoute from "@consultorios/consultorios.routes";
import authRoute from "@auth/auth.routes";
import turnosRoute from "@turnos/turnos.routes";
import pacientesRoute from "@pacientes/pacientes.routes";
import whatsappRoute from "@whatsapp/whatsapp.routes";
import tratamientosRoute from "@tratamientos/tratamientos.routes";
// Rutas
app.use("/", authRoute);
app.use("/", whatsappRoute);
app.use("/turnos", turnosRoute);
app.use("/pacientes", pacientesRoute);
app.use("/consultorios", consultorioRoute);
app.use("/tratamientos", tratamientosRoute);

// Configuración del puerto
const PORT = process.env.PORT || 3003;
app.set("port", PORT);
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
