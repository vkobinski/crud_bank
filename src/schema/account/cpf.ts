import { ASTNode } from "graphql";

const { GraphQLScalarType, GraphQLError } = require('graphql');


function validateCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let sum, rest;
    sum = 0;
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) rest = 0;
    return rest === parseInt(cpf.substring(10, 11));
}

export const GraphQLCPF = new GraphQLScalarType({
    name: 'CPF',
    description: 'Brazilian CPF number format',
    serialize(value: string) {
        return value;
    },
    parseValue(value: string) {
        if (!validateCPF(value)) {
            throw new GraphQLError('Invalid CPF format');
        }
        return value;
    },
    parseLiteral(ast: ASTNode) {
        if (ast.kind === 'StringValue') {
            if (!validateCPF(ast.value)) {
                throw new GraphQLError('Invalid CPF format');
            }
            return ast.value;
        }
        throw new GraphQLError('CPF must be a string');
    },
});
