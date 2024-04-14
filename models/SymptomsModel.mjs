import { Schema, model } from "mongoose";

export const SymptomsSchema = new Schema(
  {
    fever: {
      type: Boolean,
      default: false,
    },
    tiredness: {
      type: Boolean,
      default: false,
    },
    dryCough: {
      type: Boolean,
      default: false,
    },
    difficultyInBreathing: {
      type: Boolean,
      default: false,
    },
    soreThroat: {
      type: Boolean,
      default: false,
    },
    pains: {
      type: Boolean,
      default: false,
    },
    nasalCongestion: {
      type: Boolean,
      default: false,
    },
    runnyNose: {
      type: Boolean,
      default: false,
    },
    diarrhea: {
      type: Boolean,
      default: false,
    },
    contact: {
      type: String,
      enum: ["no", "yes", "dont-know"],
      default: "no",
    },
    severity: {
      type: String,
      enum: ["none", "mild", "moderate", "severe"],
      defaut: "none",
    },
  },
  { timestamps: true }
);

export const SymptomsModel = model("Symptoms", SymptomsSchema);
