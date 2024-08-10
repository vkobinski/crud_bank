import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from "graphql";

import packageJson from "../../../package.json";
import { GraphQLContext } from "../../types";
import AccountType from "../../modules/AccountType";
import Account from "../../db/Account";
import { AccountConnection } from "src/relay/connection";
import { connectionArgs, connectionFromArray } from "graphql-relay";

const { version } = packageJson;

export const AccountQueryType = new GraphQLObjectType<
  Record<string, unknown>,
  GraphQLContext
>({
  name: "Query",
  fields: () => ({
    version: {
      type: GraphQLString,
      resolve: () => version,
    },
    relay_accounts: {
      type: AccountConnection,
      args: connectionArgs,
      resolve: async (_, args) => connectionFromArray(await Account.find(), args),
    },
    accounts: {
      type: GraphQLList(AccountType),
      resolve: async (_) => {
        let accounts = await Account.find({});
        return accounts;
      },
    },
    account: {
      type: AccountType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { id }) => {
        const account = await Account.findById(id);

        return {
          ...account
        };
      },
    },
  }),
});

