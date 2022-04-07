require("dotenv").config();
const graphql = require("graphql");
const { GraphQLString, GraphQLID } = graphql;
const { UserInputError } = require("apollo-server");
const { UserType, MessageType, FileType } = require("../TypeDefs/User");
const { Book, User } = require("../../models");
const bcrypt = require("bcryptjs");
const { GraphQLUpload } = require("graphql-upload");
const path = require("path");

function generateRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const REGISTER_USER = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    confirmPassword: { type: GraphQLString },
    role: { type: GraphQLString },
  },
  async resolve(parent, args) {
    let { username, email, password, confirmPassword, role } = args;
    let errors = {};
    try {
      //Validations
      if (email.trim() === "") errors.email = "Email must not be empty";
      if (username.trim() === "")
        errors.username = "Username must not be empty";
      if (password.trim() === "")
        errors.password = "Password must not be empty";
      if (confirmPassword.trim() === "")
        errors.confirmPassword = "Confirm password must not be empty";

      if (password != confirmPassword)
        errors.confirmPassword = "Password must match, please reenter";

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      //Hash Password
      password = await bcrypt.hash(password, 6);
      const user = await User.create({
        username,
        email,
        password,
        role,
      });
      return user;
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        err.errors.forEach(
          (e) => (errors[e.path] = `${e.path} is already taken`)
        );
      } else if (err.name === "SequelizeValidationError") {
        err.errors.forEach((e) => (errors[e.path] = e.message));
      }
      throw new UserInputError("Bad input", { errors });
    }
  },
};

const UPDATE_PASSWORD = {
  type: MessageType,
  args: {
    username: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const { username, oldPassword, password } = args;
    const user = await User.findOne({
      where: { username: username },
    });

    if (!user) {
      throw new Error("USERNAME DOESNT EXIST");
    }
    //comparing old passwords input and db password
    let correctPassword = await bcrypt.compare(oldPassword, user?.password);

    if (correctPassword === true) {
      const npassword = await bcrypt.hash(password, 6);
      await User.update(
        { password: npassword },
        { where: { username: username } }
      );

      return { successful: true, message: "PASSWORD UPDATED" };
    } else {
      throw new Error("CURRENT PASSWORD DO NOT MATCH!");
    }
  },
};

const DELETE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent, args) {
    id = args.id;
    await User.destroy({
      where: {
        id,
      },
    });
    return { successful: true, message: "deleted" };
  },
};

const UPDATE_PROFILEIMAGE = {
  type: FileType,
  args: {
    file: { type: GraphQLUpload },
  },
  async resolve(parent, { file }, { user }) {
    try {
      // if (!user) throw new AuthenticationError("Unauthenticated");
      const { createReadStream, filename, mimetype } = await file;
      const { ext } = path.parse(filename);
      const newfileName = generateRandomString(12);
      const randomName = newfileName + ext;

      const stream = createReadStream();
      const pathName = path.join(
        __dirname,
        `../../../public/images/${randomName}`
      );
      const write = require("fs").createWriteStream(pathName);
      await stream.pipe(write);

      const url = `${process.env.Root_URL}/images/${randomName}`;
      await User.update(
        { imageUrl: url },
        { where: { username: user.username } }
      );
      return { imageUrl: url, imageType: mimetype };
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = {
  REGISTER_USER,
  UPDATE_PASSWORD,
  DELETE_USER,
  UPDATE_PROFILEIMAGE,
};
