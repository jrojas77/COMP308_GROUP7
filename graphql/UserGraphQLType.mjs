import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { VitalSingsType } from "./VitalSignsGraphQLType.mjs";

export const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Representation of a Student',
    fields: {
        _id: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLString },
        vitalSigns: { type: new GraphQLList(VitalSingsType) },
        dailyUpdates: { type: new GraphQLList(VitalSingsType) }
    }
});