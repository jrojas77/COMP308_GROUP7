import {
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";

export const VitalSignsType = new GraphQLObjectType({
  name: "VitalSigns",
  description: "Vital Signs representation for graphQL",
  fields: {
    _id: { type: GraphQLID },
    bodyTemperature: { type: GraphQLFloat },
    heartRate: { type: GraphQLFloat },
    bloodPressure: { type: GraphQLFloat },
    systolicBloodPressure: { type: GraphQLFloat },
    diastolicBloodPressure: { type: GraphQLFloat },
    respirationRate: { type: GraphQLFloat },
    weight: { type: GraphQLFloat },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});
