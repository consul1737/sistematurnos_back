import consultorioRoute from "@consultorios/consultorios.routes";
import authRoute from "@auth/auth.routes";
import turnosRoute from "@turnos/turnos.routes";
import pacientesRoute from "@pacientes/pacientes.routes";
import whatsappRoute from "@whatsapp/whatsapp.routes";
import tratamientosRoute from "@tratamientos/tratamientos.routes";

export default function configRoutes(app) {
  // Rutas
  app.use("/", authRoute);
  // app.use("/", whatsappRoute);
  app.use("/turnos", turnosRoute);
  app.use("/pacientes", pacientesRoute);
  app.use("/consultorios", consultorioRoute);
  app.use("/tratamientos", tratamientosRoute);
}
