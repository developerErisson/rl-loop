import "dotenv/config";
import express from "express";
import { createGenerateRoute } from "./routes/generate.js";
import { GenerateController } from "./controllers/generateController.js";
import { RLLoopService } from "./services/rlLoopService.js";
import { createLLM } from "./llms/index.js";

const llm = createLLM();
const rlLoop = new RLLoopService(llm);
const controller = new GenerateController(rlLoop);

export const app = express();
app.use(express.json());
app.use("/generate", createGenerateRoute(controller));
