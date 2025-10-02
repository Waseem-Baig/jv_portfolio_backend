const SkillCategory = require("../models/SkillCategory");

// Get all skill categories
const getAllSkillCategories = async (req, res) => {
  try {
    const skillCategories = await SkillCategory.find().sort({ order: 1 });
    res.json(skillCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single skill category by ID
const getSkillCategoryById = async (req, res) => {
  try {
    const skillCategory = await SkillCategory.findById(req.params.id);
    if (!skillCategory) {
      return res.status(404).json({ message: "Skill category not found" });
    }
    res.json(skillCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new skill category
const createSkillCategory = async (req, res) => {
  try {
    const skillCategory = new SkillCategory(req.body);
    const savedSkillCategory = await skillCategory.save();
    res.status(201).json(savedSkillCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a skill category
const updateSkillCategory = async (req, res) => {
  try {
    const skillCategory = await SkillCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!skillCategory) {
      return res.status(404).json({ message: "Skill category not found" });
    }
    res.json(skillCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a skill category
const deleteSkillCategory = async (req, res) => {
  try {
    const skillCategory = await SkillCategory.findByIdAndDelete(req.params.id);
    if (!skillCategory) {
      return res.status(404).json({ message: "Skill category not found" });
    }
    res.json({ message: "Skill category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a skill to a category
const addSkillToCategory = async (req, res) => {
  try {
    const { skill } = req.body;
    const skillCategory = await SkillCategory.findById(req.params.id);

    if (!skillCategory) {
      return res.status(404).json({ message: "Skill category not found" });
    }

    if (!skillCategory.skills.includes(skill)) {
      skillCategory.skills.push(skill);
      await skillCategory.save();
    }

    res.json(skillCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove a skill from a category
const removeSkillFromCategory = async (req, res) => {
  try {
    const { skill } = req.body;
    const skillCategory = await SkillCategory.findById(req.params.id);

    if (!skillCategory) {
      return res.status(404).json({ message: "Skill category not found" });
    }

    skillCategory.skills = skillCategory.skills.filter((s) => s !== skill);
    await skillCategory.save();

    res.json(skillCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllSkillCategories,
  getSkillCategoryById,
  createSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
  addSkillToCategory,
  removeSkillFromCategory,
};
