import { GraphQLFloat, GraphQLObjectType, GraphQLString } from "graphql";

export const VitalSingsType = new GraphQLObjectType({
    name: "VitalSigns",
    description: "Vital Signs representation for graphQL",
    fields: {
        bodyTemperature: { type: GraphQLFloat },
        heartRate: { type: GraphQLFloat },
        bloodPressure: { type: GraphQLFloat },
        systolicBloodPresure: { type: GraphQLString },
        diastolicBloodPresure: { type: GraphQLString },
        respirationRate: { type: GraphQLFloat },
        weight: { type: GraphQLFloat },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    }
});