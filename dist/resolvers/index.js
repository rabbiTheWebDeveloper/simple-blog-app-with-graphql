"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
exports.resolvers = {
    Query: {
        users: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma.user.findMany();
        }),
    },
    Mutation: {
        signup: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const isExist = yield prisma.user.findFirst({
                where: {
                    email: args.email
                }
            });
            if (isExist) {
                return {
                    userError: "User Already Exist",
                    token: null
                };
            }
            // return await prisma.user.create({
            //   data: {
            //     email: args.email,
            //     password: args.password,
            //   },
            // });
            const hasgPassword = yield bcrypt_1.default.hash(args.password, 10);
            // return await prisma.user.create({
            //   data: {
            //     name: args.name,
            //     email: args.email,
            //     password: args.password,
            //   },
            // })
            console.log(hasgPassword);
        }),
    }
};
