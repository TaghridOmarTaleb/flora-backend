import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import contentRoutes from "./routes/content.js";
import workshopRoutes from "./routes/workshop.js";
import messageRoutes from "./routes/message.js";
import plantRoutes from "./routes/plant.js";
import adminRoutes from "./routes/admin.js";
import categoryRoutes from "./routes/category.js";
import registeredRoutes from "./routes/registered.js";
import testimonialRoutes from "./routes/testimonial.js";

import helmet from "helmet";
import debug from "debug";
import cors from "cors";
import multer from "multer";

const app = express();

app.use(express.json());

dotenv.config();

await connectDB();

const PORT = process.env.PORT || 8000;

const Debugger = debug("app:startUp");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  Debugger("morgan enabled!");
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("static"));
// const corsOptions = {
//   origin: ["https://flora-50qn.onrender.com", "http://localhost:8000"],
// };

// app.use(cors(corsOptions));

//app.use(helmet());

// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(express.raw());

app.use("/images", express.static("./images"));

app.use((err, req, res, next) => {
  console.log("Multer error:", err);
  if (err instanceof multer.MulterError) {
    res.status(400).send("Bad Request: Invalid file");
  } else {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
});

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use("/content", contentRoutes);
app.use("/workshop", workshopRoutes);
app.use("/message", messageRoutes);
app.use("/plant", plantRoutes);
app.use("/admin", adminRoutes);
app.use("/categories", categoryRoutes);
app.use("/registered", registeredRoutes);
app.use("/testimonial", testimonialRoutes);

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on Port ${PORT}`
  )
);
