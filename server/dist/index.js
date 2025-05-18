"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const board_route_1 = __importDefault(require("./routes/board.route"));
const list_route_1 = __importDefault(require("./routes/list.route"));
const card_route_1 = __importDefault(require("./routes/card.route"));
const cookieParser = require("cookie-parser");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(cookieParser());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use("/api/auth", auth_route_1.default);
app.use("/board", board_route_1.default);
app.use("/board/:boardId/list", list_route_1.default);
app.use("/board/:boardId/list/:listId/card", card_route_1.default);
app.listen(PORT, () => {
    console.log(`server is listening on PORT ${PORT}`);
});
