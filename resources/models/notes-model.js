import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: "incomplete",
      enum: ["incomplete", "completed"],
    },
  },
  {
    timestamps: true,
  }
);

export const Note = mongoose.model("note", NoteSchema);
