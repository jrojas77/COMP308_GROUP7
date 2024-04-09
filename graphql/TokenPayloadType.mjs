import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const TokenPayloadType = new GraphQLObjectType({
  name: "Token",
  description: "Authentication Token",
  fields: {
    token: { type: GraphQLNonNull(GraphQLString) },
  },
});
