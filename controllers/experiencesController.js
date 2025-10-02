const Experience = require("../models/Experience");
const path = require("path");
const fs = require("fs");

// Get all experiences
const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ isActive: true }).sort({
      order: 1,
    });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single experience by ID
const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new experience
const createExperience = async (req, res) => {
  try {
    const experienceData = req.body;

    // If file was uploaded, set the image path
    if (req.file) {
      experienceData.image = `/uploads/${req.file.filename}`;
    }

    const experience = new Experience(experienceData);
    const savedExperience = await experience.save();
    res.status(201).json(savedExperience);
  } catch (error) {
    // If there was an error and a file was uploaded, delete it
    if (req.file) {
      const filePath = path.join(__dirname, "..", "uploads", req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    res.status(400).json({ message: error.message });
  }
};

// Update an experience
const updateExperience = async (req, res) => {
  try {
    const experienceData = req.body;
    const oldExperience = await Experience.findById(req.params.id);

    if (!oldExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // If new file was uploaded, update image path and delete old file
    if (req.file) {
      experienceData.image = `/uploads/${req.file.filename}`;

      // Delete old image file if it exists and is not a default image
      if (oldExperience.image && oldExperience.image.startsWith("/uploads/")) {
        const oldFilePath = path.join(__dirname, "..", oldExperience.image);
        fs.unlink(oldFilePath, (err) => {
          if (err) console.error("Error deleting old file:", err);
        });
      }
    }

    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      experienceData,
      { new: true, runValidators: true }
    );

    res.json(experience);
  } catch (error) {
    // If there was an error and a file was uploaded, delete it
    if (req.file) {
      const filePath = path.join(__dirname, "..", "uploads", req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    res.status(400).json({ message: error.message });
  }
};

// Delete an experience
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Delete associated image file if it exists
    if (experience.image && experience.image.startsWith("/uploads/")) {
      const filePath = path.join(__dirname, "..", experience.image);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Soft delete an experience (set isActive to false)
const softDeleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.json({ message: "Experience deactivated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
  softDeleteExperience,
};
