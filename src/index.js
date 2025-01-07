import express, { json, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import "./config/passportConfig.js";

dotenv.config("");

dbConnect();

const app = express();

const allowedOrigins = [
  "http://localhost:3001",
  "https://node2fa.articole-smart.eu",
];

// middleware
// const corsOptions = {
//   origin: ["http://localhost:3001", "https://node2fa.articole-smart.eu"],
//   credentials: true,
// };
// app.use(cors(corsOptions));
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || origin) {
        return callback(null, true);
      } else {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
    },
    credentials: true,
  })
);
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

//listen
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
