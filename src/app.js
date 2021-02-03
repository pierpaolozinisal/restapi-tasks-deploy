import express from "express";
import morgan from "morgan";
import cors from "cors";
import TasksRoutes from "./routes/tasks.routes";

const app = express();

//Setting
app.set("port", process.env.PORT || 3000);

// Middleware
const corsOptions = {}
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Routes
app.get("/", (req, res) => {
  res.send("Welcome to my application!");
});

app.get("/api", (req, res) => {
  res.redirect("/api/tasks");
});

app.use("/api/tasks", TasksRoutes);

export default app;
