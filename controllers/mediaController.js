const Media = require("../models/Media");
const path = require("path");
const fs = require("fs");

// Get all media items
const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find({ isActive: true }).sort({ order: 1 });
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single media item by ID
const getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: "Media item not found" });
    }
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new media item
const createMedia = async (req, res) => {
  try {
    const mediaData = req.body;

    // If file was uploaded, set the image path
    if (req.file) {
      mediaData.image = `/uploads/${req.file.filename}`;
    }

    const media = new Media(mediaData);
    const savedMedia = await media.save();
    res.status(201).json(savedMedia);
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

// Update a media item
const updateMedia = async (req, res) => {
  try {
    const mediaData = req.body;
    const oldMedia = await Media.findById(req.params.id);

    if (!oldMedia) {
      return res.status(404).json({ message: "Media item not found" });
    }

    // If new file was uploaded, update image path and delete old file
    if (req.file) {
      mediaData.image = `/uploads/${req.file.filename}`;

      // Delete old image file if it exists and is not a default image
      if (oldMedia.image && oldMedia.image.startsWith("/uploads/")) {
        const oldFilePath = path.join(__dirname, "..", oldMedia.image);
        fs.unlink(oldFilePath, (err) => {
          if (err) console.error("Error deleting old file:", err);
        });
      }
    }

    const media = await Media.findByIdAndUpdate(req.params.id, mediaData, {
      new: true,
      runValidators: true,
    });

    res.json(media);
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

// Delete a media item
const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: "Media item not found" });
    }

    // Delete associated image file if it exists
    if (media.image && media.image.startsWith("/uploads/")) {
      const filePath = path.join(__dirname, "..", media.image);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    await Media.findByIdAndDelete(req.params.id);
    res.json({ message: "Media item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Soft delete a media item (set isActive to false)
const softDeleteMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!media) {
      return res.status(404).json({ message: "Media item not found" });
    }

    res.json({ message: "Media item deactivated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
  softDeleteMedia,
};
