const graphql = require("graphql");
// const { CategoryType } = require("../TypeDefs/Category");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;
const { Category } = require("../../models");

const InsuranceType = new GraphQLObjectType({
  name: "Insurance",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    gender: { type: GraphQLString },
    catId: { type: GraphQLString },
    maritalStatus: { type: GraphQLString },

    // categories: {
    //   type: CategoryType,
    //   async resolve(parent, args) {
    //     console.log(parent.catId);
    //     return await Category.findOne({ where: { id: parent.catId } });
    //   },
    // },
  }),
});

module.exports = { InsuranceType };
