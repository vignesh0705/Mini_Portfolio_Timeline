import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

console.log("🚀 Setting up Mini Portfolio Timeline Database...\n");

function checkMongoDB() {
  return new Promise((resolve) => {
    const mongod = spawn("mongod", ["--version"], { stdio: "pipe" });

    mongod.on("close", (code) => {
      if (code === 0) {
        console.log("✅ MongoDB is installed");
        resolve(true);
      } else {
        console.log("❌ MongoDB is not installed or not in PATH");
        console.log("\n📋 To install MongoDB:");
        console.log("1. Visit: https://www.mongodb.com/try/download/community");
        console.log("2. Download and install MongoDB Community Server");
        console.log("3. Add MongoDB to your system PATH");
        console.log("4. Run this script again\n");
        resolve(false);
      }
    });

    mongod.on("error", () => {
      console.log("❌ MongoDB is not installed or not in PATH");
      resolve(false);
    });
  });
}

function startMongoDB() {
  return new Promise((resolve) => {
    console.log("🔄 Starting MongoDB service...");

    const dataDir = join(projectRoot, "data", "db");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
      console.log("📁 Created data directory:", dataDir);
    }

    const mongod = spawn("mongod", ["--dbpath", dataDir, "--port", "27017"], {
      stdio: "pipe",
      detached: true,
    });

    mongod.stdout.on("data", (data) => {
      const output = data.toString();
      if (output.includes("Waiting for connections")) {
        console.log("✅ MongoDB is running on port 27017");
        console.log("📊 Database: mini-portfolio-timeline");
        console.log(
          "🔗 Connection: mongodb://localhost:27017/mini-portfolio-timeline\n"
        );
        resolve(true);
      }
    });

    mongod.stderr.on("data", (data) => {
      const error = data.toString();
      if (error.includes("Address already in use")) {
        console.log("✅ MongoDB is already running on port 27017\n");
        resolve(true);
      }
    });

    mongod.on("error", (error) => {
      console.log("❌ Failed to start MongoDB:", error.message);
      resolve(false);
    });

    setTimeout(() => {
      console.log(
        "⏱️  MongoDB startup timeout - it may still be starting...\n"
      );
      resolve(true);
    }, 10000);
  });
}

async function initializeDatabase() {
  console.log("🌱 Initializing database with seed data...");

  try {
    const { default: seedDatabase } = await import("../lib/seedDatabase.js");
    await seedDatabase();
    console.log("✅ Database initialized successfully\n");
  } catch (error) {
    console.log("❌ Database initialization failed:", error.message);
  }
}
async function setup() {
  const mongoInstalled = await checkMongoDB();

  if (!mongoInstalled) {
    process.exit(1);
  }

  const mongoStarted = await startMongoDB();

  if (mongoStarted) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await initializeDatabase();

    console.log("🎉 Setup completed successfully!");
    console.log("\n📋 Next steps:");
    console.log("1. Run: npm run dev");
    console.log("2. Open: http://localhost:3000");
    console.log("3. Login with:");
    console.log("   - Admin: vicky@admin.com / 123456");
    console.log("   - Demo: demo@example.com / demo123\n");
  }
}

setup().catch(console.error);
