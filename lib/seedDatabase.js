import connectDB from "./mongodb.js";
import User from "../models/User.js";

const seedDatabase = async () => {
  try {
    await connectDB();

    // Check if admin user already exists
    const existingAdmin = await User.findByEmail("vicky@admin.com");
    if (!existingAdmin) {
      // Create admin user
      const adminUser = new User({
        name: "Vicky",
        email: "vicky@admin.com",
        password: "123456",
        role: "admin",
        portfolioItems: [
          {
            title: "System Administrator",
            company: "Mini Portfolio Timeline",
            date: "Jan 2024 - Present",
            description:
              "Managing the portfolio timeline system and user accounts.",
            tags: ["Admin", "Management", "System"],
            category: "experience",
          },
        ],
      });

      await adminUser.save();
      console.log("✅ Admin user created: vicky@admin.com");
    }

    // Check if demo user already exists
    const existingDemo = await User.findByEmail("demo@example.com");
    if (!existingDemo) {
      // Create demo user with sample portfolio data
      const demoUser = new User({
        name: "Demo User",
        email: "demo@example.com",
        password: "demo123",
        role: "user",
        portfolioItems: [
          {
            title: "Full Stack Developer",
            company: "Tech Solutions Inc.",
            date: "Jan 2023 - Present",
            description:
              "Developing web applications using React, Node.js, and MongoDB. Leading a team of 3 developers.",
            tags: ["React", "Node.js", "MongoDB", "Leadership"],
            category: "experience",
          },
          {
            title: "Bachelor of Computer Science",
            company: "University of Technology",
            date: "Sep 2019 - Jun 2022",
            description:
              "Graduated with honors. Specialized in software engineering and database systems.",
            tags: ["Computer Science", "Software Engineering", "Databases"],
            category: "education",
          },
          {
            title: "E-commerce Platform",
            company: "Personal Project",
            date: "Mar 2023 - May 2023",
            description:
              "Built a full-stack e-commerce platform with payment integration and admin dashboard.",
            tags: ["React", "Express", "Stripe", "PostgreSQL"],
            category: "project",
          },
          {
            title: "AWS Certified Developer",
            company: "Amazon Web Services",
            date: "Aug 2023",
            description:
              "Certified in AWS cloud services and serverless architecture.",
            tags: ["AWS", "Cloud", "Serverless"],
            category: "certification",
          },
          {
            title: "JavaScript & TypeScript",
            date: "Expert Level",
            description:
              "Advanced proficiency in modern JavaScript and TypeScript development.",
            tags: ["JavaScript", "TypeScript", "ES6+"],
            category: "skill",
          },
          {
            title: "First Open Source Contribution",
            date: "Dec 2022",
            description:
              "Made my first contribution to a popular React library with 10k+ stars.",
            tags: ["Open Source", "React", "Community"],
            category: "milestone",
          },
        ],
      });

      await demoUser.save();
      console.log("✅ Demo user created: demo@example.com");
    }

    console.log("✅ Database seeding completed");
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
  }
};

export default seedDatabase;
