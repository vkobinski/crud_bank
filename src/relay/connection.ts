import { connectionDefinitions } from 'graphql-relay';
import AccountType from '../modules/AccountType';
import TransactionType from '../modules/TransactionType';

const { connectionType: AccountConnection } = connectionDefinitions({
    nodeType: AccountType,
});

const { connectionType: TransactionConnection } = connectionDefinitions({
    nodeType: TransactionType,
});

export { AccountConnection, TransactionConnection };