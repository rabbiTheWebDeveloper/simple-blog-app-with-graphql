"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql

type Query {
  users: [User]
}

type Mutation {
  signup(name: String,email: String!, password: String!): UserPayload
}

type UserPayload {
  userError: String!
  token: String!
}
  type User {
    name: String
    email: String
    posts: [Post]
    profile : Profile
  
    
  }
  type Post {
    title: String
    content: String
    published: Boolean
    author: User
  }
   type Profile {
    bio: String
    user: User
   }

`;
