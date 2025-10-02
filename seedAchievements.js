require("dotenv").config();
const mongoose = require("mongoose");
const Achievement = require("./models/Achievement");

// MongoDB connection
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/jv-kalyan";

const achievementsData = [
  {
    title: "National Leadership Award",
    description:
      "Recognized at national level for outstanding leadership and community impact",
    image: "/uploads/164345b8-1028-4af7-a957-a347aa2d7838.png",
    icon: "Award",
    order: 1,
  },
  {
    title: "Student Empowerment Initiative",
    description:
      "Leading collaborative programs connecting students with academic and industry experts",
    image: "/uploads/891f5dee-ec79-4cc4-8cbc-0e75b345bbb5.png",
    icon: "Users",
    order: 2,
  },
  {
    title: "Community Impact at Scale",
    description:
      "Organizing events that brought together thousands for social and educational initiatives",
    image: "/uploads/af513be0-c5d4-4426-b783-1cdb8e3dfcd1.png",
    icon: "BookOpen",
    order: 3,
  },
  {
    title: "Electoral Education Leadership",
    description:
      "Spearheading systematic voter education and democratic participation programs",
    image: "/uploads/36a177f7-a42b-4560-9f6a-f7c0031f7791.png",
    icon: "Mic",
    order: 4,
  },
];

async function seedAchievementsData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing data
    await Achievement.deleteMany({});
    console.log("Cleared existing achievements data");

    // Insert new data
    const createdAchievements = await Achievement.insertMany(achievementsData);
    console.log(
      `Successfully seeded ${createdAchievements.length} achievements:`
    );

    createdAchievements.forEach((achievement, index) => {
      console.log(`${index + 1}. ${achievement.title}`);
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
seedAchievementsData();
