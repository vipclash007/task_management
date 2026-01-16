import express from "express"
// import taskRoutes from "./routes/taskRoutes.js"
import dotenv from "dotenv"

dotenv.config();

const app = express();

// middleware - to read json data
// add before the routes
app.use(express.json());

// app.use("/api/tasks", taskRoutes);

app.use("/hello", (req, res)=>{
    res.status(200).send("hello, How are you doing?");
})

app.listen(process.env.PORT, ()=>{
    console.log(`server running on port: ${process.env.PORT}`);
})
