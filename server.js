const express = require("express");

const mongodb = require("./db/contacts.js");

const app = express();

const port = process.env.PORT || 3000;

app.use("/", require("./routes/index.js"));

mongodb.initDb((error) => {
  if (error) {
    console.log(error);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running on port ${port}`);
    });
  }
});
