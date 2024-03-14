import { GraphQLFloat, GraphQLObjectType } from "graphql";

export const VitalSingsType = new GraphQLObjectType({
    name: "Vital Signs",
    description: "Vital Signs representation for graphQL",
    fields: () => ({
        bodyTemperature: { type: GraphQLFloat },
        heartRate: { type: GraphQLFloat },
        bloodPressure: { type: GraphQLFloat },
        respirationRate: { type: GraphQLFloat },
        weight: { type: GraphQLFloat }
    })
});