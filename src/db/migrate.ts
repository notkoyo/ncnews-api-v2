import db from "@/db/database";
import { migrate } from "drizzle-orm/neon-http/migrator";

(async () => {
  try {
    await migrate(db, {
      migrationsFolder: "drizzle",
    });

    console.log("Migration Successful.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();