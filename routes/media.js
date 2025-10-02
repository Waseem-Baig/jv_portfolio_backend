const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getAllMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
  softDeleteMedia,
} = require("../controllers/mediaController");

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// GET /api/media - Get all media items
router.get("/", getAllMedia);

// GET /api/media/:id - Get a single media item
router.get("/:id", getMediaById);

// POST /api/media - Create a new media item (with optional image upload)
router.post("/", upload.single("image"), createMedia);

// PUT /api/media/:id - Update a media item (with optional image upload)
router.put("/:id", upload.single("image"), updateMedia);

// DELETE /api/media/:id - Delete a media item
router.delete("/:id", deleteMedia);

// PATCH /api/media/:id/deactivate - Soft delete a media item
router.patch("/:id/deactivate", softDeleteMedia);

module.exports = router;
