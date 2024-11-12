import express from "express";
import usersRouter from "./routes/users.js";

const app = express();

// ROUTES
app.use("/users", usersRouter);

// MAIN PAGE
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// PORT
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
