export const typeDefs = `#graphql

type Query {
  users: [User]
}

type Mutation {
  signup(name: String,email: String!, password: String! , bio: String): UserPayload,
  login(email: String!, password: String!): UserPayload
  post (title: String!, content: String! ): Post
}

type UserPayload {
  userError: String
  token: String
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
