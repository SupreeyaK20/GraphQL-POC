const { UserInputError, AuthenticationError } = require("apollo-server");
const { GraphQLString, GraphQLID } = require("graphql");
const { Category } = require("../../models");
const { CategoryType } = require("../TypeDefs/Category");
const { MessageType } = require("../TypeDefs/User");

const ADD_CATEGORY = {
  type: CategoryType,
  args: {
    name: { type: GraphQLString },
  },
  async resolve(_, args, { user }) {
    // if (!user) throw new AuthenticationError("Unauthenticated");
    let { name } = args;
    let errors = {};
    try {
      if (name.trim() === "") errors.name = "Name must not be empty";
      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      const cat = await Category.create({
        name,
      });
      return cat;
    } catch (error) {
      throw new UserInputError("Bad input", { errors });
    }
  },
};

const DELETE_CATEGORY = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_, args, { user }) {
    // if (!user) throw new AuthenticationError("Unauthenticated");
    let id = args.id;
    try {
      await Category.destroy({
        where: { id },
      });
      return { successful: true, message: "deleted" };
    } catch (error) {
      throw error;
    }
  },
};

const UPDATE_CATEGORY = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const { id, name } = args;

    try {
      const cat = await Category.findOne({
        where: { id: id },
      });

      if (!cat) {
        throw new Error("Category DOESNT EXIST");
      }

      await Category.update({ name: name }, { where: { id: id } });

      return { successful: true, message: "CATEGORY UPDATED" };
    } catch (error) {
      throw new Error("CATEGORY DO NOT MATCH!");
    }
  },
};

module.exports = { ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY };
