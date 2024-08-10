import { GraphQLSchema } from "graphql";

import { AccountMutationType } from "./MutationType";
import { AccountQueryType } from "./QueryType";

export const accountSchema = new GraphQLSchema({
  mutation: AccountMutationType,
  query: AccountQueryType,

});
