import { GraphQLNonNull, GraphQLObjectType } from "graphql";

export const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Representation of a Student',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        birthDate: { type: GraphQLNonNull(GraphQLString) },
    })
});