import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { UserType } from "./UserGraphQLType.mjs";
import { UserModel } from "../models/UserModel.mjs";
import { PatientModel } from "../models/PatientModel.mjs";
import { NurseModel } from "../models/NurseModel.mjs";
import { VitalSingsType } from "./VitalSignsGraphQLType.mjs";
import { VitalSignsModel } from "../models/VitalSignsModel.mjs";

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
        patient: {
            type: UserType,
            description: 'Get Patient By Id',
            args: {
                _id: { type: GraphQLString }
            },
            resolve: async (_, { _id }) => {
                let patient = PatientModel.findById(_id);
                return patient;
            }
        },
        nurse: {
            type: UserType,
            description: 'Get nurse By Id',
            args: {
                _id: { type: GraphQLString }
            },
            resolve: async (_, { _id }) => {
                let nurse = NurseModel.findById(_id);
                return nurse;
            }
        }
    }
});

const RootMutatorType = new GraphQLObjectType({
    name: 'mutator',
    description: 'mutator',
    fields: {
        addUser: {
            type: UserType,
            description: 'Create a new User',
            args: {
                firstName: { type: GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
                type: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_, { firstName, lastName, email, password, type }) => {
                if (type === "nurse") {
                    let newNurse = new NurseModel({ firstName, lastName, email, password });
                    return await newNurse.save();
                }
                if (type === "patient") {
                    let newPatient = new PatientModel({ firstName, lastName, email, password });
                    return await newPatient.save();
                }
            }
        },
        addDailyUpdateToPatient: {
            type: VitalSingsType,
            description: 'Add daily Updated Vital sign for the patient by the patient',
            args: {
                _id: { type: GraphQLNonNull(GraphQLString) },
                bodyTemperature: { type: GraphQLFloat },
                heartRate: { type: GraphQLFloat },
                bloodPressure: { type: GraphQLFloat },
                respirationRate: { type: GraphQLFloat },
                weight: { type: GraphQLFloat }
            },
            resolve: async (_, { _id, bodyTemperature, heartRate, bloodPressure, respirationRate, weight }) => {
                let patient = await PatientModel.findById(_id);
                let newVitalSigns = patient.dailyInformation.create({bodyTemperature, heartRate, bloodPressure, respirationRate, weight});
                patient.dailyInformation.push(newVitalSigns);
                await patient.save();
                return newVitalSigns;
            }
        },
        addVitalsInformation: {
            type: VitalSingsType,
            description: 'Add daily Updated Vital sign for the patient by the patient',
            args: {
                _id: { type: GraphQLNonNull(GraphQLString) },
                bodyTemperature: { type: GraphQLFloat },
                heartRate: { type: GraphQLFloat },
                bloodPressure: { type: GraphQLFloat },
                respirationRate: { type: GraphQLFloat },
                weight: { type: GraphQLFloat }
            },
            resolve: async (_, { _id, bodyTemperature, heartRate, bloodPressure, respirationRate, weight }) => {
                let patient = await PatientModel.findById(_id);
                let newVitalSigns = new VitalSignsModel({bodyTemperature, heartRate, bloodPressure, respirationRate, weight});
                patient.vitalSignsInformation.push(newVitalSigns);
                await patient.save();
                return newVitalSigns;
            }
        }
    }
});

export const usersSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutatorType
});