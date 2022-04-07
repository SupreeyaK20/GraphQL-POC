const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema } = graphql;
const {
  REGISTER_USER,
  UPDATE_PASSWORD,
  DELETE_USER,
  UPDATE_PROFILEIMAGE,
} = require("./Mutations/User");
const {
  GET_ALL_USERS,
  LOGIN,
  USER_PROFILE,
  GET_ROLES,
  PEGINATION_ALL_USERS,
} = require("./Queries/User");
const {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} = require("./Mutations/Category");
const { GET_ALL_CATEGORIES, EXPORT_EXCEL } = require("./Queries/Category");
const { ADD_INSURANCE } = require("./Mutations/Insurance");
const { GET_INSURANCE } = require("./Queries/Insurance");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    login: LOGIN,
    getAllUsers: GET_ALL_USERS,
    getAllCategories: GET_ALL_CATEGORIES,
    getUserProfile: USER_PROFILE,
    getAllInsurance: GET_INSURANCE,
    getRoles: GET_ROLES,
    exportCategory: EXPORT_EXCEL,
    peginationUser: PEGINATION_ALL_USERS,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: REGISTER_USER,
    updatePassword: UPDATE_PASSWORD,
    deleteUser: DELETE_USER,
    addCategory: ADD_CATEGORY,
    deleteCategory: DELETE_CATEGORY,
    updateCategory: UPDATE_CATEGORY,
    addInsurance: ADD_INSURANCE,
    uploadFile: UPDATE_PROFILEIMAGE,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = { schema };
