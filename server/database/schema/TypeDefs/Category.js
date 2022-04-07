const graphql = require("graphql");
const { InsuranceType } = require("./Insurance");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const { Insu } = require("../../models");

const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    insurances: {
      type: new graphql.GraphQLList(InsuranceType),
      resolve(parent, args) {
        return Insu.findAll({ where: { catId: parent.id } });
      },
    },
  }),
});

module.exports = { CategoryType };
