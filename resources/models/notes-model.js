import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      default: 0,
      enum: [0, 1, 2, 3],
    },
  },
  {
    timestamps: true,
  }
);

export const Note = mongoose.model("note", NoteSchema);
