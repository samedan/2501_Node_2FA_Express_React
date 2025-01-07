import express, { json, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";
import "./config/passportConfig.js";

dotenv.config("");

dbConnect();

const app = express();

// middleware
const corsOptions = {
  origin: ["http://localhost:3001", "https://node2fa.articole-smart.eu"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(json({ limit: "100mb" }));
app.use(urlencoded({ limit: "100mb", extended: true }));

// session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
//passport
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  // set root directory
  const __dirname = path.resolve();
  console.log("__dirname", __dirname);

  // make frontend a static folder
  app.use(express.static(path.join(__dirname, "/client/dist")));
  // any route that is not '/api/users' goes to '/frontend/dist/index.html'
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("server is ready");
  });
}

//listen
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
