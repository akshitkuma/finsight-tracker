
# 💰 FinSight – Personal Finance Tracker

[![Vercel](https://img.shields.io/badge/Live%20Demo-Vercel-blue?logo=vercel)](https://finsight-tracker-d8bq.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/Code-GitHub-black?logo=github)](https://github.com/akshitkuma/finsight-tracker)

---

## 📌 Project Overview

**FinSight** is a full-stack personal finance tracker that allows users to manage their income, expenses, and budgets with ease. Built using modern technologies, it offers a clean, responsive interface along with insightful financial charts.

Developed as part of an internship assignment, this project demonstrates strong frontend and backend integration, database operations, and interactive data visualizations.

---

## 🚀 Features Implemented

### ✅ Stage 1
- Add, view, and delete **transactions**
- Dashboard showing:
  - Total income
  - Total expenses
  - Net balance

### ✅ Stage 2
- Add and manage **budget categories**
- Category-wise budget overview via **pie charts**
- Monthly **budgeting and tracking** with bar charts

### ✅ Stage 3
- **Edit/Delete** functionality for budgets and transactions
- **Single budget per category per month** enforced
- Backend: PostgreSQL + Prisma ORM
- UI enhanced with **shadcn/ui components**
- Performance optimizations and responsive design

---

## ⚙️ Setup Instructions

### 📍 Prerequisites

- Node.js (v18+)
- Docker (for PostgreSQL and Redis)
- Git installed

---

### 💻 Local Development Steps

```bash
# 1. Clone the repository
git clone https://github.com/akshitkuma/finsight-tracker.git
cd finsight-tracker

# 2. Install dependencies
npm install

# 3. Copy and update environment variables
cp .env.example .env
# ➤ Fill in your PostgreSQL/Redis config

# 4. Start database via Docker
docker-compose up -d

# 5. Run migrations
npx prisma migrate dev

# 6. Start development server
npm run dev
```

👉 Open `http://localhost:3000` in your browser to access the app.

---

## 🌐 Live Deployment

The project is live and accessible at:  
🔗 **https://finsight-tracker-d8bq.vercel.app/**

---

## 🛠 Tech Stack

| Layer       | Technology                         |
|-------------|-------------------------------------|
| Frontend    | Next.js (App Router), Tailwind CSS, shadcn/ui |
| Charts      | Recharts                           |
| Backend     | Next.js API Routes, Node.js        |
| ORM         | Prisma ORM                         |
| Database    | PostgreSQL (via Docker)            |
| Deployment  | Vercel                             |
| Optional    | Redis for caching                  |

---


## 👤 Author

**Akshit Kumar**  
[GitHub – @akshitkuma](https://github.com/akshitkuma)

---

## 📬 Contact

If you have questions, suggestions, or feedback:

📧 kakshit257@gmail.com (or your preferred contact)

---

## 📄 License

This project is for educational/demo purposes. You may modify or reuse parts with credit.

---

**Thanks for checking out FinSight!**
