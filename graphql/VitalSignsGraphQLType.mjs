import { GraphQLFloat, GraphQLObjectType, GraphQLString } from "graphql";

export const VitalSingsType = new GraphQLObjectType({
    name: "VitalSigns",
    description: "Vital Signs representation for graphQL",
    fields: {
        bodyTemperature: { type: GraphQLFloat },
        heartRate: { type: GraphQLFloat },
        bloodPressure: { type: GraphQLFloat },
        respirationRate: { type: GraphQLFloat },
        weight: { type: GraphQLFloat },
        createdDate: { type: GraphQLString },
        updateDate: { type: GraphQLString }
    }
});