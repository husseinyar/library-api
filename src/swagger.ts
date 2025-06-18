import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "API för hantering av böcker och lån 📚",
    },
  },
  apis: ["./src/routes/*.ts"], // Letar efter kommentarer
});
