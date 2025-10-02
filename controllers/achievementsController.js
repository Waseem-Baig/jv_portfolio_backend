const Achievement = require("../models/Achievement");
const path = require("path");
const fs = require("fs");

// Get all achievements
const getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({ isActive: true }).sort({
      order: 1,
    });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single achievement by ID
const getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new achievement
const createAchievement = async (req, res) => {
  try {
    const achievementData = req.body;

    // If file was uploaded, set the image path
    if (req.file) {
      achievementData.image = `/uploads/${req.file.filename}`;
    }

    const achievement = new Achievement(achievementData);
    const savedAchievement = await achievement.save();
    res.status(201).json(savedAchievement);
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

// Update an achievement
const updateAchievement = async (req, res) => {
  try {
    const achievementData = req.body;
    const oldAchievement = await Achievement.findById(req.params.id);

    if (!oldAchievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    // If new file was uploaded, update image path and delete old file
    if (req.file) {
      achievementData.image = `/uploads/${req.file.filename}`;

      // Delete old image file if it exists and is not a default image
      if (
        oldAchievement.image &&
        oldAchievement.image.startsWith("/uploads/")
      ) {
        const oldFilePath = path.join(__dirname, "..", oldAchievement.image);
        fs.unlink(oldFilePath, (err) => {
          if (err) console.error("Error deleting old file:", err);
        });
      }
    }

    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      achievementData,
      { new: true, runValidators: true }
    );

    res.json(achievement);
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

// Delete an achievement
const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    // Delete associated image file if it exists
    if (achievement.image && achievement.image.startsWith("/uploads/")) {
      const filePath = path.join(__dirname, "..", achievement.image);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: "Achievement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Soft delete an achievement (set isActive to false)
const softDeleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    res.json({ message: "Achievement deactivated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  softDeleteAchievement,
};
