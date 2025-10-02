require("dotenv").config();
const mongoose = require("mongoose");
const SkillCategory = require("./models/SkillCategory");

// MongoDB connection
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/jv-kalyan";

const skillsData = [
  {
    icon: "Brain",
    title: "AI & Data Science",
    skills: [
      "NLP",
      "Scikit-Learn",
      "Machine Learning",
      "Data Analysis",
      "Predictive Modeling",
    ],
    color: "primary",
    order: 1,
  },
  {
    icon: "Code2",
    title: "Programming & Tech",
    skills: ["Python", "RPA", "Azure", "Linux", "API Development"],
    color: "secondary",
    order: 2,
  },
  {
    icon: "Users",
    title: "Leadership & Strategy",
    skills: [
      "Strategic Planning",
      "Team Management",
      "Organizational Development",
      "Project Management",
    ],
    color: "primary",
    order: 3,
  },
  {
    icon: "Megaphone",
    title: "Public Speaking",
    skills: [
      "Conference Speaking",
      "Workshop Facilitation",
      "Entrepreneurship Training",
      "Mentoring",
    ],
    color: "secondary",
    order: 4,
  },
  {
    icon: "Database",
    title: "Consulting",
    skills: [
      "Business Strategy",
      "Process Optimization",
      "Digital Transformation",
      "Innovation Management",
    ],
    color: "primary",
    order: 5,
  },
  {
    icon: "Cloud",
    title: "Technology Stack",
    skills: [
      "Cloud Computing",
      "Automation",
      "Integration",
      "Scalable Solutions",
    ],
    color: "secondary",
    order: 6,
  },
];

async function seedSkillsData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing data
    await SkillCategory.deleteMany({});
    console.log("Cleared existing skills data");

    // Insert new data
    const createdSkills = await SkillCategory.insertMany(skillsData);
    console.log(
      `Successfully seeded ${createdSkills.length} skill categories:`
    );

    createdSkills.forEach((skill, index) => {
      console.log(
        `${index + 1}. ${skill.title} (${skill.skills.length} skills)`
      );
    });
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

// Run the seed function
seedSkillsData();
