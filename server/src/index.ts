import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import authRouter from "./routes/auth.route"
import boardRouter from "./routes/board.route"
import listRouter from "./routes/list.route"
import router from './routes/card.route';
const cookieParser = require("cookie-parser")

const app = express();
const PORT = 3000;

app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials : true,
    origin : "http://localhost:5173"
}))


app.use("/api/auth", authRouter)
app.use("/", boardRouter)
app.use("/board/:id/", listRouter)
app.use("/board/:boardId/list/:listId", router)

app.listen(PORT, () =>{
    console.log(`server is listening on PORT ${PORT}`)
})