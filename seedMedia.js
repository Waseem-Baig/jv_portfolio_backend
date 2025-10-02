require("dotenv").config();
const mongoose = require("mongoose");
const Media = require("./models/Media");

const mediaData = [
  {
    title: "Podcast with Pemmasani Chandra Shekhar",
    description:
      "Engaging conversation with Guntur MP on leadership and governance",
    image: "/uploads/9b07a4a2-48f6-452f-9c84-fbae4d7172ec.png",
    type: "Podcast",
    icon: "Mic",
    link: "https://youtu.be/sZ8u-TqG6Tw?si=fEWXtRAtEbibvDnM",
    order: 1,
    isActive: true,
  },
  {
    title: "SWEEP Electoral Education Event",
    description:
      "Speaking at systematic voters education and electoral participation program",
    image: "/uploads/36a177f7-a42b-4560-9f6a-f7c0031f7791.png",
    type: "Speaking",
    icon: "Camera",
    link: "https://www.instagram.com/reel/C6FYmBNIEi_/?igsh=MTJ6dHM1aXVzZXJzbA==",
    order: 2,
    isActive: true,
  },
  {
    title: "Leadership Content Creation",
    description:
      "Creating engaging content on youth empowerment and innovation",
    image: "/uploads/ff5d922c-4190-454f-b4a8-250dfd2100ec.png",
    type: "Content",
    icon: "Award",
    link: "https://www.instagram.com/reel/C62kktFrqyA/?igsh=MWxvbnp0djBnbjZ3cg==",
    order: 3,
    isActive: true,
  },
  {
    title: "Panel Discussion Leadership",
    description:
      "Leading strategic discussions on innovation and community development",
    image: "/uploads/e9bb5b4a-5e48-47e1-8f41-452a858222d3.png",
    type: "Panel",
    icon: "Mic",
    link: "https://www.instagram.com/reel/C6YvX4MNkwE/?igsh=MXYyYzM5dXhvZm5xaw==",
    order: 4,
    isActive: true,
  },
];

const seedMedia = async () => {
  try {
    // Connect to MongoDB if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio"
      );
    }

    // Clear existing media data
    await Media.deleteMany({});
    console.log("Cleared existing media data");

    // Insert new media data
    const createdMedia = await Media.insertMany(mediaData);
    console.log(`Created ${createdMedia.length} media items:`);

    createdMedia.forEach((media, index) => {
      console.log(`${index + 1}. ${media.title} (${media.type})`);
    });

    console.log("\nMedia seeding completed successfully!");
    return createdMedia;
  } catch (error) {
    console.error("Error seeding media data:", error);
    throw error;
  }
};

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedMedia()
    .then(() => {
      console.log("Seeding completed. Exiting...");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}

module.exports = seedMedia;
