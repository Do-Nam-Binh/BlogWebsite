import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true, // Auto-generate a unique string ID
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    preview: {
      type: String,
      required: false,
    },

    link: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
