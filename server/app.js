const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const { GraphQLUpload, graphqlUploadExpress } = require("graphql-upload");
const { schema } = require("./database/schema");
// const { ApolloServer } = require("apollo-server");
const { sequelize } = require("./database/models");
const authMiddleware = require("./database/middleware/authMiddleware");

async function startServer() {
  const server = new ApolloServer({
    schema,
    context: authMiddleware,
  });

  const app = express();
  app.use(graphqlUploadExpress());

  await server.start();
  server.applyMiddleware({ app });
  app.use(express.static("public"));

  app.use(cors());

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at port 4000`);
    sequelize
      .authenticate()
      .then(() => console.log("Database connected!!"))
      .catch((err) => logger.error(err));
  });
}

startServer();
