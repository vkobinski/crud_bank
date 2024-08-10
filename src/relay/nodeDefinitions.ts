import { nodeDefinitions, fromGlobalId } from 'graphql-relay';
import Account from '../db/Account';
import Transaction from '../db/Transaction';

const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
    async (globalId) => {
        const { type, id } = fromGlobalId(globalId);
        if (type === 'Account') {
            return await Account.findById(id);
        } else if (type === 'Transaction') {
            return await Transaction.findById(id);
        }
        return null;
    },
    (obj) => {
        if (obj instanceof Account) {
            return 'Account';
        } else if (obj instanceof Transaction) {
            return 'Transaction';
        }
        return null;
    }
);

export { nodeInterface, nodeField, nodesField };