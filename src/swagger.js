import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Función para generar una especificación Swagger para un módulo específico
function generateSwaggerDocs(moduleName, tag) {
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: `${moduleName} API Documentation`,
        version: "1.0.0",
        description: `Documentación del módulo ${moduleName}`,
      },
      servers: [
        {
          url: "http://localhost:3000", // URL de tu backend
        },
      ],
      tags: [tag], // Tags específicos para el módulo
    },
    apis: [`./src/components/${moduleName.toLowerCase()}/*swagger.js`], // Rutas específicas del módulo
  };
  return swaggerJsDoc(swaggerOptions);
}

// Generar especificaciones para cada módulo
const authSwaggerDocs = generateSwaggerDocs("Auth", {
  name: "Auth",
  description: "Endpoints relacionados con autenticación",
});

const pacientesSwaggerDocs = generateSwaggerDocs("Pacientes", {
  name: "Pacientes",
  description: "Endpoints relacionados con pacientes",
});

const consultoriosSwaggerDocs = generateSwaggerDocs("Consultorios", {
  name: "Consultorios",
  description: "Endpoints relacionados con consultorios",
});
const tratamientosSwaggerDocs = generateSwaggerDocs("Tratamientos", {
  name: "Tratamientos",
  description: "Endpoints relacionados con tratamientos",
});
const turnosSwaggerDocs = generateSwaggerDocs("Turnos", {
  name: "Turnos",
  description: "Endpoints relacionados con turnos",
});
const whatsappSwaggerDocs = generateSwaggerDocs("WhatsApp", {
  name: "WhatsApp",
  description: "Endpoints relacionados con WhatsApp",
});

// Combinar todas las especificaciones en una sola
const combinedSwaggerDocs = {
  ...authSwaggerDocs,
  ...pacientesSwaggerDocs,
  ...consultoriosSwaggerDocs,
  ...tratamientosSwaggerDocs,
  ...turnosSwaggerDocs,
  ...whatsappSwaggerDocs,
  paths: {
    ...authSwaggerDocs.paths,
    ...pacientesSwaggerDocs.paths,
    ...consultoriosSwaggerDocs.paths,
    ...tratamientosSwaggerDocs.paths,
    ...turnosSwaggerDocs.paths,
    ...whatsappSwaggerDocs.paths,
  },
  tags: [
    ...authSwaggerDocs.tags,
    ...pacientesSwaggerDocs.tags,
    ...consultoriosSwaggerDocs.tags,
    ...tratamientosSwaggerDocs.tags,
    ...turnosSwaggerDocs.tags,
    ...whatsappSwaggerDocs.tags,
  ],
};

// Exportar una función para configurar Swagger en tu aplicación
export default (app) => {
  // Rutas para servir las especificaciones JSON de cada módulo
  app.get("/api-docs/swagger-auth.json", (req, res) => {
    res.json(authSwaggerDocs);
  });

  app.get("/api-docs/swagger-pacientes.json", (req, res) => {
    res.json(pacientesSwaggerDocs);
  });

  app.get("/api-docs/swagger-consultorios.json", (req, res) => {
    res.json(consultoriosSwaggerDocs);
  });

  app.get("/api-docs/swagger-tratamientos.json", (req, res) => {
    res.json(tratamientosSwaggerDocs);
  });

  app.get("/api-docs/swagger-turnos.json", (req, res) => {
    res.json(turnosSwaggerDocs);
  });

  app.get("/api-docs/swagger-whatsapp.json", (req, res) => {
    res.json(whatsappSwaggerDocs);
  });

  // Configurar la interfaz de Swagger UI con la especificación combinada
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(combinedSwaggerDocs));
};
