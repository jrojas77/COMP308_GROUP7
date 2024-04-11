import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
} from "graphql";

export const SymptomsType = new GraphQLObjectType({
    name: "Symptoms",
    description: "Symptoms of the player",
    fields: {
        _id: { type: GraphQLID },
        fever: { type: GraphQLBoolean },
        tiredness: { type: GraphQLBoolean },
        dryCough: { type: GraphQLBoolean },
        difficultyInBreathing: { type: GraphQLBoolean },
        soreThroat: { type: GraphQLBoolean },
        pains: { type: GraphQLBoolean },
        nasalCongestion: { type: GraphQLBoolean },
        runnyNose: { type: GraphQLBoolean },
        diarrhea: { type: GraphQLBoolean },
        contact: { type: GraphQLBoolean },
        severity: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    }
});