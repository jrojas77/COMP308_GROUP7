import {
  GraphQLError,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";
import { UserType } from "./UserGraphQLType.mjs";
import { PatientType } from "./PatientGraphQLType.mjs";
import { UserModel } from "../models/UserModel.mjs";
import { PatientModel } from "../models/PatientModel.mjs";
import { NurseModel } from "../models/NurseModel.mjs";
import { SymptomsModel } from "../models/SymptomsModel.mjs";
import { VitalSignsType } from "./VitalSignsGraphQLType.mjs";
import { VitalSignsModel } from "../models/VitalSignsModel.mjs";
import { createToken, requireAuth } from "../utils/Utils.mjs";
import { TokenPayloadType } from "./TokenPayloadType.mjs";
import { SymptomsType } from "./SymptomsGraphQLType.mjs";

const USER_MODEL_BY_TYPE = {
  nurse: NurseModel,
  patient: PatientModel,
};

const RootQueryType = new GraphQLObjectType({
  name: "root",
  description: "Root Query for Users",
  fields: {
    me: {
      type: UserType,
      description: "Get profile of currently authenticated user",
      resolve: requireAuth(async (_, args, { user }) => {
        return await UserModel.findById(user.userId);
      }),
    },
    users: {
      type: new GraphQLList(UserType),
      description: "Get All Users",
      resolve: requireAuth(async () => {
        let users = await UserModel.find();
        return users;
      }),
    },
    user: {
      type: UserType,
      description: "Get User By Id",
      args: {
        _id: { type: GraphQLString },
      },
      resolve: requireAuth(async (_, { _id }) => {
        let user = await UserModel.findById(_id);
        return user;
      }),
    },
    patients: {
      type: new GraphQLList(PatientType),
      description: "Get Patients",
      resolve: requireAuth(async () => {
        let patients = PatientModel.find();
        return patients;
      }),
    },
    patient: {
      type: PatientType,
      description: "Get Patient By Id",
      args: {
        _id: { type: GraphQLString },
      },
      resolve: requireAuth(async (_, { _id }) => {
        let patient = PatientModel.findById(_id);
        return patient;
      }),
    },
    nurse: {
      type: UserType,
      description: "Get nurse By Id",
      args: {
        _id: { type: GraphQLString },
      },
      resolve: requireAuth(async (_, { _id }) => {
        let nurse = NurseModel.findById(_id);
        return nurse;
      }),
    },
  },
});

const RootMutatorType = new GraphQLObjectType({
  name: "mutator",
  description: "mutator",
  fields: {
    signup: {
      type: TokenPayloadType,
      args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLNonNull(GraphQLString) },
        dateOfBirth: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (
        _,
        { firstName, lastName, email, password, type, dateOfBirth }
      ) => {
        try {
          const existingUser = await UserModel.findOne({ email: email });
          if (existingUser) {
            throw new GraphQLError("Email already registered.");
          }

          const UserModelByType = USER_MODEL_BY_TYPE[type];

          if (!UserModelByType) {
            throw new GraphQLError(`User type: ${type} not supported`);
          }

          const user = await UserModelByType.create({
            firstName,
            lastName,
            email,
            password,
            dateOfBirth,
          });
          return user;
        } catch (ex) {
          console.error("signup error", ex);
          if (ex.message === "Email already registered.") {
            throw new GraphQLError(ex.message);
          } else {
            throw new GraphQLError("An error occurred during signup.");
          }
        }
      },
    },
    login: {
      type: TokenPayloadType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, { email, password }) => {
        try {
          const user = await UserModel.login(email, password);

          if (!user) {
            throw new GraphQLError("Login failed");
          }
          const token = createToken(user._id, user);
          return { token };
        } catch (ex) {
          if (ex.message === "Incorrect password") {
            throw new GraphQLError(ex.message);
          } else {
            throw new GraphQLError("An error occurred during login.");
          }
        }
      },
    },
    addDailyUpdateToPatient: {
      type: VitalSignsType,
      description:
        "Add daily Updated Vital sign for the patient by the patient",
      args: {
        bodyTemperature: { type: GraphQLFloat },
        heartRate: { type: GraphQLFloat },
        systolicBloodPressure: { type: GraphQLFloat },
        diastolicBloodPressure: { type: GraphQLFloat },
        respirationRate: { type: GraphQLFloat },
        weight: { type: GraphQLFloat },
      },
      resolve: requireAuth(
        async (
          _,
          {
            bodyTemperature,
            heartRate,
            systolicBloodPressure,
            diastolicBloodPressure,
            respirationRate,
            weight,
          }
        ) => {
          let patient = await PatientModel.findById(_id);
          let newVitalSigns = patient.dailyInformation.create({
            bodyTemperature,
            heartRate,
            systolicBloodPressure,
            diastolicBloodPressure,
            respirationRate,
            weight,
          });
          patient.dailyInformation.push(newVitalSigns);
          await patient.save();
          return newVitalSigns;
        }
      ),
    },
    addVitalsInformation: {
      type: VitalSignsType,
      description:
        "Add daily Updated Vital sign for the patient by the patient",
      args: {
        _id: { type: GraphQLNonNull(GraphQLString) },
        bodyTemperature: { type: GraphQLFloat },
        heartRate: { type: GraphQLFloat },
        systolicBloodPressure: { type: GraphQLFloat },
        diastolicBloodPressure: { type: GraphQLFloat },
        respirationRate: { type: GraphQLFloat },
        weight: { type: GraphQLFloat },
      },
      resolve: requireAuth(
        async (
          _,
          {
            _id,
            bodyTemperature,
            heartRate,
            systolicBloodPressure,
            diastolicBloodPressure,
            respirationRate,
            weight,
          }
        ) => {
          try {
            console.log("_ID:", _id);
            let patient = await PatientModel.findById(_id);
            if (!patient) {
              throw new GraphQLError(`Patient with ID ${_id} not found`);
            }

            let newVitalSigns = new VitalSignsModel({
              bodyTemperature,
              heartRate,
              systolicBloodPressure,
              diastolicBloodPressure,
              respirationRate,
              weight,
            });
            patient.vitalSignsInformation.push(newVitalSigns);
            await patient.save();
            return newVitalSigns;
          } catch (error) {
            console.error("addVitalsInformation error", error);
            throw new GraphQLError(
              "An error occurred while adding vitals information."
            );
          }
        }
      ),
    },
    addSymptomsData: {
      type: SymptomsType,
      description:
        "Add daily updated symptom information for the patient by the patient",
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        fever: { type: GraphQLBoolean },
        tiredness: { type: GraphQLBoolean },
        dryCough: { type: GraphQLBoolean },
        difficultyInBreathing: { type: GraphQLBoolean },
        soreThroat: { type: GraphQLBoolean },
        pains: { type: GraphQLBoolean },
        nasalCongestion: { type: GraphQLBoolean },
        runnyNose: { type: GraphQLBoolean },
        diarrhea: { type: GraphQLBoolean },
        contact: { type: GraphQLString },
        severity: { type: GraphQLBoolean },
      },
      resolve: requireAuth(async (_, args, context) => {
        try {
          const { _id, ...symptoms } = args;
          let patient = await PatientModel.findById(_id);
          if (!patient) {
            throw new GraphQLError(`Patient with ID ${_id} not found`);
          }

          const newSymptomEntry = new SymptomsModel({
            ...symptoms,
          });

          // Assuming the `symptoms` field in the Patient model is an array
          patient.symptoms.push(newSymptomEntry);
          await patient.save();

          return newSymptomEntry;
        } catch (error) {
          console.error("addSymptomsData error:", error);
          throw new GraphQLError(
            "An error occurred while adding symptoms information."
          );
        }
      }),
    },
  },
});

export const usersSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutatorType,
});
