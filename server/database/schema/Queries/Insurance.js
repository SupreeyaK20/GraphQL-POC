const graphql = require("graphql");
const { GraphQLList } = graphql;
const { AuthenticationError } = require("apollo-server");
const { Insu } = require("../../models");
const { InsuranceType } = require("../TypeDefs/Insurance");

const GET_INSURANCE = {
  type: new GraphQLList(InsuranceType),
  async resolve(_, args, { user }) {
    try {
      if (!user) throw new AuthenticationError("Unauthenticated");

      const ins = await Insu.findAll();
      return ins;
    } catch (error) {
      throw error;
    }
  },
};
module.exports = { GET_INSURANCE };
