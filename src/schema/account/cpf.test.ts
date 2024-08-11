import { GraphQLError } from "graphql";
import { GraphQLCPF } from "./cpf";

test('tries to create empty cpf', () => {
    expect(() => GraphQLCPF.parseValue("")).toThrow(GraphQLError);
});

test('tries to create shorter cpf', () => {
    expect(() => GraphQLCPF.parseValue("1")).toThrow(GraphQLError);
    expect(() => GraphQLCPF.parseValue("12")).toThrow(GraphQLError);
    expect(() => GraphQLCPF.parseValue("123")).toThrow(GraphQLError);
    expect(() => GraphQLCPF.parseValue("1234")).toThrow(GraphQLError);
    expect(() => GraphQLCPF.parseValue("12345")).toThrow(GraphQLError);
    expect(() => GraphQLCPF.parseValue("123456")).toThrow(GraphQLError);
    expect(() => GraphQLCPF.parseValue("1234567")).toThrow(GraphQLError);
});

test('valid cpf', () => {
    expect(() => GraphQLCPF.parseValue("50350835004")).not.toEqual(null);
});

