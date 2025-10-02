const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    title: {
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
    type: {
      type: String,
      required: true,
      enum: [
        "Podcast",
        "Speaking",
        "Content",
        "Panel",
        "Interview",
        "Workshop",
        "Webinar",
        "Video",
      ],
    },
    icon: {
      type: String,
      required: true,
      enum: [
        "Play",
        "Mic",
        "Camera",
        "Award",
        "Video",
        "Users",
        "Speaker",
        "Headphones",
      ], // Lucide icon names
    },
    link: {
      type: String,
      required: true,
      trim: true,
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

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
