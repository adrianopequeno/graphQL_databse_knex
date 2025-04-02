import { ApolloServer } from "apollo-server";

import { typeDefs, resolvers } from "./graphql/schema.js";
import { context } from "./graphql/context.js";
import { PostsApi } from "./graphql/post/datasources.js";
import { UsersApi } from "./graphql/user/datasources.js";
import { LoginApi } from "./graphql/login/datasources.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => {
    return {
      postsApi: new PostsApi(),
      usersApi: new UsersApi(),
      loginApi: new LoginApi(),
    };
  },
  playground: {
    settings: {
      "request.credentials": "include",
      "schema.polling.enable": false,
    },
  },
  uploads: false,
  cors: {
    origin: ["https://cdpn.io"], // * <- allow request from all domains, [https:domio.permitido.com]
    credentials: true, // <- enable credentials (cookies)
  },
});

server.listen(4003).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
