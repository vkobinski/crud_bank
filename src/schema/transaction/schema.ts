import { GraphQLSchema } from "graphql";

import { TransactionMutationType } from "./MutationType";
import { TransactionQueryType } from "./QueryType";

export const transactionSchema = new GraphQLSchema({
  query: TransactionQueryType,
  mutation: TransactionMutationType,
});
