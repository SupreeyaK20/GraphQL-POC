const graphql = require("graphql");
const { GraphQLList, GraphQLString, GraphQLID } = graphql;
const { User, Role } = require("../../models");
const { UserType, RoleType } = require("../TypeDefs/User");
const { UserInputError, AuthenticationError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../../../logger/logger");

const JWT_SECRET_KEY = "secret key";

const LOGIN = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    let { username, password } = args;
    let errors = {};
    try {
      //Validations
      if (username.trim() === "")
        errors.username = "Username must not be empty";
      if (password === "") errors.password = "Password must not be empty";
      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      const user = await User.findOne({
        where: { username },
      });

      if (!user) {
        errors.username = "User not found";
        logger.log("error", errors + " Error while retriving");
        throw new UserInputError("User not found", { errors });
      }

      //comparing password
      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) {
        errors.password = "Password is incorrect";
        logger.log("error", errors + " Error while retriving");
        throw new UserInputError("Password is incorrect", { errors });
      }

      const token = jwt.sign({ username }, JWT_SECRET_KEY, {
        expiresIn: 60 * 60,
      });

      // user.token = token;
      // return user;

      //return created date format
      logger.log("info", "Successfully Login Query Hit");
      return {
        ...user.toJSON(),
        createdAt: user.createdAt.toISOString(),
        token,
      };
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        err.errors.forEach(
          (e) => (errors[e.path] = `${e.path} is already taken`)
        );
      } else if (err.name === "SequelizeValidationError") {
        err.errors.forEach((e) => (errors[e.path] = e.message));
      }
      logger.log("error", err + " Error while retriving");
      throw new UserInputError("Bad input", { errors });
    }
  },
};

const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  async resolve(_, args, { user }) {
    try {
      if (!user) throw new AuthenticationError("Unauthenticated");
      const users = await User.findAll();
      logger.log("info", "Successfully retrived");
      return users;
    } catch (err) {
      logger.log("error", err + " Error while retriving");
      throw err;
    }
  },
};

const GET_ROLES = {
  type: new GraphQLList(RoleType),
  resolve(_, args) {
    try {
      const roles = Role.findAll();
      logger.log("info", "Roles Successfully retrived");
      return roles;
    } catch (error) {
      logger.log("error", error + " Error while retriving");
      throw error;
    }
  },
};

const USER_PROFILE = {
  type: UserType,
  async resolve(_, args, { user }, context) {
    if (!user) throw new AuthenticationError("Unauthenticated");

    try {
      const singleUser = await User.findOne({
        where: { username: user.username },
      });
      logger.log("info", "Successfully retrived profile");
      return singleUser;
    } catch (error) {
      logger.log("error", error + " Error while retriving");
      throw error;
    }
  },
};

const PEGINATION_ALL_USERS = {
  type: new GraphQLList(UserType),
  args: {
    limit: { type: graphql.GraphQLInt },
    offset: { type: graphql.GraphQLInt },
  },
  async resolve(_, args, { user }) {
    try {
      const { limit, offset } = args;
      const users = await User.findAll({ limit, offset });
      return users;
    } catch (err) {
      throw err;
    }
  },
};
module.exports = {
  GET_ALL_USERS,
  LOGIN,
  USER_PROFILE,
  GET_ROLES,
  PEGINATION_ALL_USERS,
};
