"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
require('./db');
var app = express_1.default();
var PORT = process.env.PORT || 5000;
app.use(cors_1.default());
app.get('/', function (_, res) {
    res.sendStatus(200);
});
app.listen(PORT, function () { return console.log("Server connected to PORT " + PORT); });
