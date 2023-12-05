import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { jwtHelper } from "../utlis/jwHelper";
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: async (parent: any, args: any, context: any) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    signup: async (parent: any, args: any, context: any) => {
      const isExist = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (isExist) {
        return {
          userError: "User Already Exist",
          token: null,
        };
      }
      const hasgPassword = await bcrypt.hash(args.password, 10);
      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hasgPassword,
        },
      });
      const token = await jwtHelper({ userId: newUser.id });
      return {
        userError: null,
        token: token,
      };
      // return await prisma.user.create({
      //   data: {
      //     email: args.email,
      //     password: args.password,
      //   },
      // });

      // return await prisma.user.create({
      //   data: {
      //     name: args.name,
      //     email: args.email,
      //     password: args.password,
      //   },
      // })
      console.log(hasgPassword);
    },
  },
};
