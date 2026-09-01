const express = require("express");
const authRoutes = require("./routes/auth.routes");
const postsRoutes = require("./routes/posts.routes");
const cookie = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookie());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

module.exports = app;
