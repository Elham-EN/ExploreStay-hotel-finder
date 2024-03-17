"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const constants_1 = require("./constants");
const database_1 = __importDefault(require("./config/database"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const constants_2 = require("./constants");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Allow Server to only accept request from this url only & it must
// include the credential that is the http cookie in the request
app.use((0, cors_1.default)({
    origin: constants_1.frontendUrl,
    credentials: true,
}));
// Make frontend be part of the backend rather than it's own server
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
app.use("/api/users", users_route_1.default);
app.use("/api/auth", auth_route_1.default);
// Connect to the database and then start the server
(0, database_1.default)(constants_2.mongoConnectionString)
    .then(() => {
    app.listen(constants_1.port, () => {
        console.log(`Server listening on port ${constants_1.port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit(1);
});
