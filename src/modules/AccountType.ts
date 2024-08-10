import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLID } from "graphql";
import { globalIdField } from "graphql-relay";

export const AccountType = new GraphQLObjectType({
  name: "Account",
  fields: () => ({
    id: globalIdField('Account'),
    owner_name: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj) => obj.owner_name,
    },
    owner_cpf: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj) => obj.owner_cpf,
    },
    password: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj) => obj.password,
    },
    balance: {
      type: GraphQLNonNull(GraphQLFloat),
      resolve: (obj) => obj.balance,
    },
  }),
});

export default AccountType;
