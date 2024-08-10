import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLID } from "graphql";
import { globalIdField } from "graphql-relay";

export const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  fields: () => ({
    id: globalIdField('Transaction'),
    value: {
      type: GraphQLNonNull(GraphQLFloat),
      resolve: (obj) => obj.value,
    },
    from: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj) => obj.from,
    },
    to: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (obj) => obj.to,
    },
  }),
});

export default TransactionType;
