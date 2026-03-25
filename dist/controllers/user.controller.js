"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.createUser = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const createUser = async (req, res) => {
    const { email, name } = req.body;
    const user = await client_1.default.user.create({
        data: { email, name },
    });
    res.json(user);
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    const users = await client_1.default.user.findMany();
    res.json(users);
};
exports.getUsers = getUsers;
//# sourceMappingURL=user.controller.js.map