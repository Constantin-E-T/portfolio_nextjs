🛠 Prisma & Database Reset Guide
Use this guide when fixing Prisma schema issues or authentication errors.
1️⃣ Reset and Reapply Prisma Migrations
⚠️ WARNING: This will drop your database and erase all data. Use only when necessary.

bash
Copy
Edit
pnpm prisma migrate reset
Drops and recreates the database.
Reapplies all migrations.
If prompted, type y to confirm.
2️⃣ Verify schema.prisma Models
Ensure your prisma/schema.prisma includes all required models (especially User, Account, and Session).

Example:

prisma
Copy
Edit
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
}

model Account {
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@id([provider, providerAccountId])
}

model Session {
  sessionToken String   @unique
  userId       String
  expires      DateTime
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
3️⃣ Apply Migrations
Run this command to reapply database migrations:

bash
Copy
Edit
pnpm prisma migrate dev --name init
This creates and applies a new migration.
4️⃣ Regenerate Prisma Client
Ensure Prisma Client is up to date:

bash
Copy
Edit
pnpm prisma generate
Generates the latest client based on schema.prisma.
5️⃣ Restart Next.js Server
After resetting everything, restart the Next.js app:

bash
Copy
Edit
pnpm dev
6️⃣ Test Authentication
Try logging in with GitHub authentication again.
If authentication still fails, check Prisma logs for missing tables.
🎯 Additional Debugging Commands
🔹 Check existing database tables:

bash
Copy
Edit
pnpm prisma db pull
🔹 Open Prisma Studio to inspect the database:

bash
Copy
Edit
pnpm prisma studio
🔹 Manually create missing tables (as a last resort):

bash
Copy
Edit
pnpm prisma migrate deploy
✅ Now, your Prisma setup is properly reset, and authentication should work!
