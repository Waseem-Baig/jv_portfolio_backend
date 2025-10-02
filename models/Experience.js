const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
      enum: [
        "Building",
        "Users",
        "Lightbulb",
        "GraduationCap",
        "Briefcase",
        "Award",
        "Target",
        "Star",
      ], // Lucide icon names
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;
