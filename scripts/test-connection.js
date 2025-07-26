import connectDB from "../lib/mongodb.js";
import User from "../models/User.js";

async function testConnection() {
  console.log("🔄 Testing MongoDB connection...\n");

  try {
    await connectDB();
    console.log("✅ Database connection successful");
    const userCount = await User.countDocuments();
    console.log(`📊 Total users in database: ${userCount}`);

    const adminUser = await User.findByEmail("vicky@admin.com");
    if (adminUser) {
      console.log("👑 Admin user found:", adminUser.name);
    } else {
      console.log("❌ Admin user not found");
    }
    const demoUser = await User.findByEmail("demo@example.com");
    if (demoUser) {
      console.log("👤 Demo user found:", demoUser.name);
      console.log(`📝 Portfolio items: ${demoUser.portfolioItems.length}`);
    } else {
      console.log("❌ Demo user not found");
    }

    const stats = await User.getStats();
    console.log("\n📈 System Statistics:");
    console.log(`   Total Users: ${stats.totalUsers}`);
    console.log(`   Admin Users: ${stats.adminUsers}`);
    console.log(`   Regular Users: ${stats.regularUsers}`);
    console.log(`   Portfolio Items: ${stats.totalPortfolioItems}`);
    console.log(`   Active Users: ${stats.activeUsers}`);

    console.log("\n🎉 All tests passed! Database is ready.");
  } catch (error) {
    console.error("❌ Connection test failed:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Make sure MongoDB is running: mongod");
    console.log("2. Check connection string in .env.local");
    console.log("3. Run database setup: npm run setup-db");
    process.exit(1);
  }

  process.exit(0);
}

testConnection();
