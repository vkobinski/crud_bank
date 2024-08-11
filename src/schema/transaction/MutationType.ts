import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import TransactionType from "../../../src/modules/TransactionType";
import { GraphQLCPF } from "../account/cpf";
import Transaction from "../../db/Transaction";
import Account from "../../../src/db/Account";

const CreateTransactionInputType = new GraphQLInputObjectType({
  name: "CreateTransactionInput",
  fields: () => ({
    from: {
      type: GraphQLCPF,
    },
    to: {
      type: GraphQLCPF,
    },
    value: {
      type: GraphQLFloat
    }
  }),
});

const CreateTransactionPayloadType = new GraphQLObjectType({
  name: "CreateTransactionPayload",
  fields: () => ({
    transaction: {
      type: TransactionType,
    },
  }),
});

export const TransactionMutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createTransaction: {
      type: CreateTransactionPayloadType,
      description: "Create a new transaction",
      args: {
        input: {
          type: CreateTransactionInputType,
        },
      },
      resolve: async (_, { input }) => {
        const { from, to, value } = input;

        const from_account = await Account.findOne({ owner_cpf: from });
        const to_account = await Account.findOne({ owner_cpf: to });

        if (from_account === null || to_account === null) {
          throw new Error("From or To account does not exist.");
        }

        if (from_account.balance < value) {
          throw new Error("From account do not have enough balance.");
        }

        to_account.balance += value;
        await Account.updateOne({ owner_cpf: to }, to_account);


        from_account.balance -= value;
        await Account.updateOne({ owner_cpf: from }, from_account);



        const transaction = new Transaction({ from, to, value });

        try {
          await transaction.save();
          return { transaction };
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }
  })
});