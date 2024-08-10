import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import Account from "../../../src/db/Account";
import AccountType from "../../../src/modules/AccountType";
import { GraphQLCPF } from "./cpf";


const CreateAccountInputType = new GraphQLInputObjectType({
  name: "CreateAccountInput",
  fields: () => ({
    owner_name: {
      type: GraphQLString,
    },
    owner_cpf: {
      type: GraphQLCPF,
    },
    password: {
      type: GraphQLString
    },
    balance: {
      type: GraphQLFloat,
      defaultValue: 0.0,
    }
  }),
});

const CreateAccountPayloadType = new GraphQLObjectType({
  name: "CreateAccountPayload",
  fields: () => ({
    account: {
      type: AccountType,
    },
  }),
});

export const AccountMutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createAccount: {
      type: CreateAccountPayloadType,
      description: "Create a new account",
      args: {
        input: {
          type: CreateAccountInputType,
        },
      },
      resolve: async (_, { input }) => {
        const { owner_name, owner_cpf, password, balance } = input;

        const account = new Account({ owner_name, owner_cpf, password, balance });

        try {
          await account.save();
          return { account };
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    },
  }),
});
