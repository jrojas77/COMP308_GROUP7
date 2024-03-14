import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { UserType } from "./UserGraphQLType.mjs";
import { UserModel } from "../models/UserModel.mjs";
import { PatientModel } from "../models/PatientModel.mjs";

const RootQueryType = new GraphQLObjectType({
    name: 'root',
    description: 'Root Query for Users',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            description: 'Get All Users',
            resolve: async () => {
                let users = await UserModel.find();
                return users;
            }
        },
        user: {
            type: UserType,
            description: 'Get User By Id',
            args: {
                _id: { type: GraphQLString }
            },
            resolve: async (_, { _id }) => {
                let user = await UserModel.findById(_id);
                return user;
            }
        },
        patients: {
            type: new GraphQLList(UserType),
            description: 'Get Patients',
            resolve: async () => {
                let patients = PatientModel.find();
                return patients
            }
        },
        test: {
            type: GraphQLString,
            resolve: () => "Hello I am Working"
        }
    }
});

export const usersSchema = new GraphQLSchema({
    query: RootQueryType
});