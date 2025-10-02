require("dotenv").config();
const mongoose = require("mongoose");
const Experience = require("./models/Experience");

// MongoDB connection
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/jv-kalyan";

const experiencesData = [
  {
    year: "2023 – Present",
    role: "Founder",
    organization: "Vyuha",
    description:
      "Leading a student-led innovation movement with 1500+ empowered members",
    image: "/uploads/74f430d5-8e2d-4be6-8fff-cdb0aa77c8c6.png",
    icon: "Lightbulb",
    order: 1,
  },
  {
    year: "2022 – Present",
    role: "Vice President",
    organization: "KL SAC",
    description:
      "Strategic leadership in student affairs and community development",
    image: "/uploads/ec378be5-3472-4f11-a063-4b863707624f.png",
    icon: "Building",
    order: 2,
  },
  {
    year: "2023–2024",
    role: "IIC Convener",
    organization: "Innovation & Incubation Cell",
    description: "Fostering entrepreneurship and innovation among students",
    image: "/uploads/2f095c44-3825-450f-93df-96413c20c8d3.png",
    icon: "Users",
    order: 3,
  },
  {
    year: "2021–2022",
    role: "Student",
    organization: "AI & DS @ KL University",
    description: "Specialized in Artificial Intelligence and Data Science",
    image: "/uploads/4824763f-1eb6-4a9a-83bd-0f9dfac722a9.png",
    icon: "GraduationCap",
    order: 4,
  },
];

async function seedExperiencesData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing data
    await Experience.deleteMany({});
    console.log("Cleared existing experiences data");

    // Insert new data
    const createdExperiences = await Experience.insertMany(experiencesData);
    console.log(
      `Successfully seeded ${createdExperiences.length} experiences:`
    );

    createdExperiences.forEach((experience, index) => {
      console.log(
        `${index + 1}. ${experience.role} at ${experience.organization} (${
          experience.year
        })`
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
seedExperiencesData();
