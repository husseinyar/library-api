import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger"; // Se till att exporten är `default` i swagger.ts
import apiRoutes from "./routes/api";

const app = express();
app.use(express.json());

// Swagger API-dokumentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Dina API-routes
app.use(apiRoutes);

app.listen(3000, () => {
  console.log("🚀 Servern körs på http://localhost:3000");
});