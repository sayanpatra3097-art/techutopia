# TechUtopia Referral & Authentication Backend

Robust backend powered by **Node.js, Express, PostgreSQL (Neon DB), Prisma ORM, JWT, and Resend**.

---

## 🚀 Key Features

1. **PostgreSQL Database (Neon DB)**: Stores students, passwords, unique referral codes, referral points, and referral relationship logs.
2. **CSV Database Sync**: 
   - Every registration and batch import automatically syncs to `server/data/students_database.csv`.
   - Download endpoint available at `GET /api/student/export-csv`.
3. **Pre-existing Student Import & Pregenerated Passwords**:
   - Feed emails via `server/data/existing_students.json` or `server/data/existing_students.csv`.
   - Script generates secure pregenerated passwords and unique referral codes.
   - Saves credentials audit log to `server/data/imported_credentials_log.csv`.
4. **Resend Email Blast**:
   - Sends email announcing the referral program.
   - Highlights that **10+ referrals unlock exciting prizes and exclusive goodies**.
   - Includes their login credentials (Email & Pregenerated Password).
   - Instructs them: *"Please log in with this password to get your unique referral code and start earning prizes."*
5. **Referral Point & Bonus Logic**:
   - **Signup Bonus**: When a new user registers using a referral code, they immediately receive **1 starting bonus referral credit**!
   - **Double on First Invite**: When they refer someone, they get another credit, reaching **2 referrals** instead of one!
   - **Referrer Credit**: The user whose referral code was used also earns **+1 referral point**.
6. **JWT Authentication**:
   - Secure login via Email & Password returning a 7-day signed JWT.
   - Protected `/api/student/dashboard` for viewing personal stats, referral code, progress toward the 10+ prize milestone, and invited friend list.

---

## 📁 Project Structure

```
server/
├── data/
│   ├── existing_students.json       # Feed your emails here (JSON format)
│   ├── existing_students.csv        # OR feed emails here (CSV format)
│   ├── students_database.csv        # Auto-synced complete DB export
│   └── imported_credentials_log.csv # Pregenerated passwords log
├── prisma/
│   └── schema.prisma                # PostgreSQL schema (User & ReferralLog)
├── scripts/
│   └── importAndBlast.js            # Batch import & Resend blast script
├── src/
│   ├── middleware/
│   │   └── auth.js                  # JWT verification middleware
│   ├── routes/
│   │   ├── authRoutes.js            # /register, /login, /change-password
│   │   └── studentRoutes.js         # /dashboard, /leaderboard, /export-csv
│   ├── utils/
│   │   ├── csvSync.js               # Auto-sync DB records to CSV
│   │   ├── emailService.js          # Resend API integration & templates
│   │   └── helpers.js               # Referral code & password generators
│   ├── db.js                        # Prisma Client instance
│   └── index.js                     # Express app entry point
├── .env                             # Neon connection string, Resend API key, JWT secret
└── package.json
```

---

## 🛠️ How to Use

### 1. Start the Backend Server
```bash
cd server
npm run dev
```
Server runs at `http://localhost:5000`.

### 2. Feed Existing Student Emails & Run Blast
1. The system connects directly to your live Google Sheet (`GOOGLE_SHEET_URL` in `.env`), or falls back to local CSV.
2. To sync newly registered students from Google Sheet into Neon PostgreSQL & CSV:
```bash
npm run sync:sheet
```
3. To dispatch announcement emails with pregenerated passwords to all imported students:
```bash
npm run email:dispatch
```
This will:
* Send announcement emails from `TechUtopia <noreply@techutopia.in>`.
* Provide their individual pregenerated password.
* Direct students to log in to retrieve their referral code.

---

## 🌐 API Endpoints

### Auth
* **`POST /api/auth/register`**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123!",
    "phone": "9876543210",
    "college": "Heritage Institute",
    "referralCode": "TECH-ABC12" // Optional
  }
  ```
* **`POST /api/auth/login`**
  ```json
  {
    "email": "john@example.com",
    "password": "Password123!"
  }
  ```
  Returns `{ token, user }`.

### Student (Authenticated - `Bearer <token>`)
* **`GET /api/student/dashboard`**: Returns student's referral code, shareable link, referral points, and progress towards 10+ milestone.
* **`GET /api/student/leaderboard`**: Public top 15 referrers.
* **`GET /api/student/export-csv`**: Download real-time `students_database.csv`.
