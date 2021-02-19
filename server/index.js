import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import postRoutes from "./routes/posts.js";
import authRouter from "./routes/auth.js";

const app = express();
//middlewar
//app.use(express.json());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 50000000000,
  })
);
app.use("/posts", postRoutes);
// Use routes
app.use("/api/auth", authRouter);
//herku

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

//sa3at t5del ki tna7it /api/auth trodha / kahw
//taile mta3 l image matfoutech 30 mb w Url zeda
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb+srv://medbm:20071932@cluster0.i7orw.mongodb.net/projet?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() =>
    app.listen(PORT, () => console.log(`server running on prot ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// NO warning hh
mongoose.set("useFindAndModify", false);
