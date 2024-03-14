import { Router } from "express";
import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { UserType } from "./UserGraphQLType.mjs";

const graphQLRouter = Router();

const RootQueryType = new GraphQLObjectType({
    name: 'Root User Query',
    description: 'Root Query for Users',
    fields: () => ({
        users: {
        }
    })
});

const schema = new GraphQLSchema({});