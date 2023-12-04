import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: async (parent: any, args: any, context: any) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    signup: async (parent: any, args: any, context: any) => {
      // return await prisma.user.create({
      //   data: {
      //     email: args.email,
      //     password: args.password,
      //   },
      // });
      return await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: args.password,
        },
      })
      console.log(args);
    },
  }
};
