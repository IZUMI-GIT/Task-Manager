"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loggerMiddleware(req, res, next) {
    console.log("*----Request log-----*");
    console.log(`URL : ${req.originalUrl}`);
    console.log(`Method : ${req.method}`);
    console.log("Body : ", req.body);
    console.log("Params : ", req.params);
    console.log("Query : ", req.query);
    console.log("---close---");
    next();
}
exports.default = loggerMiddleware;
