import swaggerAutogen from "swagger-autogen";
const outputFile = "./swagger.json";

const endpointsFiles = ["routes/contactsRoute.js"];

const doc = {
  info: {
    title: "Contacts API",
    description: "API de contactos",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("swagger.json generated");
});
