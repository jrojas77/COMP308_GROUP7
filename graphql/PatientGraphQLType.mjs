import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
  } from "graphql";
  import { VitalSignsType } from "./VitalSignsGraphQLType.mjs";
  import { SymptomsType } from "./SymptomsGraphQLType.mjs";
  
  export const PatientType = new GraphQLObjectType({
    name: "Patient",
    description: "Representation of a Patient",
    fields: {
      _id: { type: GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLNonNull(GraphQLString) },
      firstName: { type: GraphQLNonNull(GraphQLString) },
      lastName: { type: GraphQLNonNull(GraphQLString) },
      dateOfBirth: { type: GraphQLNonNull(GraphQLString) },
      type: { type: GraphQLString },
      vitalSignsInformation: { type: new GraphQLList(VitalSignsType) },
      dailyInformation: { type: new GraphQLList(VitalSignsType) },
      symptoms: { type: new GraphQLList(SymptomsType) }
    },
  });
  