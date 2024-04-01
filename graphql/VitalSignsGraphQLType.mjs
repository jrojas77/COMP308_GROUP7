import { GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";

export const VitalSingsType = new GraphQLObjectType({
    name: "VitalSigns",
    description: "Vital Signs representation for graphQL",
    fields: {
        _id: { type: GraphQLID},
        bodyTemperature: { type: GraphQLFloat },
        heartRate: { type: GraphQLFloat },
        bloodPressure: { type: GraphQLFloat },
        systolicBloodPresure: { type: GraphQLFloat },
        diastolicBloodPresure: { type: GraphQLFloat },
        respirationRate: { type: GraphQLFloat },
        weight: { type: GraphQLFloat },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    }
});