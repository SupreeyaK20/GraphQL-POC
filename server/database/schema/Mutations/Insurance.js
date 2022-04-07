const { UserInputError, AuthenticationError } = require("apollo-server");
const { GraphQLString, GraphQLID, GraphQLInt } = require("graphql");
const { Insu } = require("../../models");
const { InsuranceType } = require("../TypeDefs/Insurance");

const ADD_INSURANCE = {
  type: InsuranceType,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    // dob: { type: GraphQLString },
    address: { type: GraphQLString },
    gender: { type: GraphQLString },
    maritalStatus: { type: GraphQLString },
    // expiryDate: { type: GraphQLString },
    catId: { type: GraphQLString },
  },
  async resolve(_, args, { user }) {
    if (!user) throw new AuthenticationError("Unauthenticated");
    let { name, email, phone, address, gender, maritalStatus, catId } = args;
    let errors = {};
    try {
      if (name.trim() === "") errors.name = "Name must not be empty";
      if (email.trim() === "") errors.email = "Email must not be empty";
      if (phone.trim() === "") errors.phone = "Phone must not be empty";
      if (address.trim() === "") errors.address = "Address must not be empty";
      if (catId.trim() === "") errors.catId = "Category must not be empty";
      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      const insurance = await Insu.create({
        name,
        email,
        phone,
        address,
        gender,
        maritalStatus,
        catId,
      });
      return insurance;
    } catch (error) {
      throw new UserInputError("Bad input", { errors });
    }
  },
};

module.exports = { ADD_INSURANCE };
