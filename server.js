const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const startServer = async () => {
  await mongoose
    .connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

  // NON-ROUTE MIDDLEWARE
  app.use(express.json());

  // Routes
  app.use("/auth", require("./"));

  // Server
  const PORT = process.env.PORT || 5500;

  app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
  });
};

startServer();
