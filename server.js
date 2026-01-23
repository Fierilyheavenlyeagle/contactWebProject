import swaggerUi from "swagger-ui-express"; 
import fs from "fs";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

import routes from "./routes/contactsRoute.js";
import db from "./models/index.js"

const swaggerFile = JSON.parse(fs.readFileSync("./swagger.json"));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/", routes);

db.mongoose
  .connect(db.url).then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit(1);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
  console.log(`Swagger UI available at http://localhost:${port}/doc`);
});
