import express from "express";
import htmlRoutes from "./src/routes/html.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import transferRoutes from "./src/routes/transfer.routes.js";
import cors from 'cors';

const app = express()

//middlewares
app.use("/", express.static('./public'));
app.use(cors())
app.use(express.json())
app.use(htmlRoutes)
app.use(userRoutes)
app.use(transferRoutes)

export default app
