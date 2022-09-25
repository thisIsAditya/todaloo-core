import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Note = mongoose.model("note", NoteSchema);
