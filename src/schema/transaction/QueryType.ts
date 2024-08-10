import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from "graphql";

import packageJson from "../../../package.json";
import { GraphQLContext } from "../../types";
import TransactionType from "../../../src/modules/TransactionType";
import Transaction from "../../../src/db/Transaction";
import { GraphQLCPF } from "../account/cpf";
import { TransactionConnection } from "src/relay/connection";
import { connectionArgs, connectionFromArray } from "graphql-relay";

const { version } = packageJson;

export const TransactionQueryType = new GraphQLObjectType<
  Record<string, unknown>,
  GraphQLContext
>({
  name: "Query",
  fields: () => ({
    version: {
      type: GraphQLString,
      resolve: () => version,
    },
    transactions: {
      type: GraphQLList(TransactionType),
      resolve: async (_) => {
        let transactions = await Transaction.find({});
        return transactions;
      },
    },
    relay_transactions: {
      type: TransactionConnection,
      args: connectionArgs,
      resolve: async (_, args) => connectionFromArray(await Transaction.find(), args),
    },
    transaction_for_cpf: {
      type: GraphQLList(TransactionType),
      args: {
        cpf: {
          type: GraphQLNonNull(GraphQLCPF),
        },
      },
      resolve: async (_, { cpf }) => {
        const transactions = await Transaction.find().or([{ from: cpf }, { to: cpf }]);
        return transactions;

      },
    },
    transaction: {
      type: TransactionType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { id }) => {
        const transaction = await Transaction.findById(id);

        return {
          ...transaction
        };
      },
    },
  }),
});


