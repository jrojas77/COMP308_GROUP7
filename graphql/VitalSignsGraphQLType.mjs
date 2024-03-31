import { GraphQLFloat, GraphQLObjectType, GraphQLString } from "graphql";

export const VitalSingsType = new GraphQLObjectType({
  name: "VitalSigns",
  description: "Vital Signs representation for graphQL",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    bodyTemperature: { type: GraphQLFloat },
    heartRate: { type: GraphQLFloat },
    bloodPressure: { type: GraphQLFloat },
    systolicBloodPressure: { type: GraphQLString },
    diastolicBloodPressure: { type: GraphQLString },
    respirationRate: { type: GraphQLFloat },
    weight: { type: GraphQLFloat },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});
