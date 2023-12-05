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
      if (args.bio) {
        await prisma.profile.create({
          data: {
            bio: args.bio,
            userId: newUser.id,
          },
        });
      }
      const token = await jwtHelper({ userId: newUser.id });

      return {
        userError: null,
        token: token,
      };
    },
    login: async (parent: any, args: any, context: any) => {
      const user = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (!user) {
        return {
          userError: "User Not Found",
          token: null,
        };
      }
      const isMatch = await bcrypt.compare(args.password, user.password);
      if (!isMatch) {
        return {
          userError: "Wrong Password",
          token: null,
        };
      }
      const token = await jwtHelper({ userId: user.id });
      return {
        userError: null,
        token: token,
      };
    },
  },
};
