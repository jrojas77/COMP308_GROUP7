import { Router } from "express";
import { GraphQLObjectType, GraphQLSchema } from "graphql";

const graphQLRouter = Router();

const schema = new GraphQLSchema({});