const mongoose = require('mongoose');
import { model } from "mongoose";

const transactionSchemma = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    }
});

const Transaction = model('Transaction', transactionSchemma);
export default Transaction;