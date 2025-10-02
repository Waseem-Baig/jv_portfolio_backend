const mongoose = require("mongoose");

const skillCategorySchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: true,
      enum: ["Brain", "Code2", "Users", "Megaphone", "Database", "Cloud"], // Lucide icon names
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    skills: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    color: {
      type: String,
      required: true,
      enum: ["primary", "secondary"],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const SkillCategory = mongoose.model("SkillCategory", skillCategorySchema);

module.exports = SkillCategory;
