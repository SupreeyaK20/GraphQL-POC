const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    confirmPassword: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    token: { type: GraphQLString },
    role: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
  }),
});

const MessageType = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  }),
});

const RoleType = new GraphQLObjectType({
  name: "Role",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

const FileType = new GraphQLObjectType({
  name: "File",
  fields: () => ({
    name: { type: GraphQLString },
    imageType: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    mimtype: { type: GraphQLString },
  }),
});

module.exports = { UserType, MessageType, RoleType, FileType };
