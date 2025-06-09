#  FinSight – Personal Finance Tracker

A full-stack web application designed to help users manage their personal finances with ease. Track income/expenses, set budgets, visualize category-wise spending, and gain monthly insights—all through a clean, intuitive interface.

---

## 🔗 Live Demo

🌐 [View Deployed App on Vercel](https://finsight-tracker-d8bq.vercel.app/)

📁 [View Source Code on GitHub](https://github.com/akshitkuma/finsight-tracker)

---

## 🚀 Features Implemented

### ✅ Stage 1: Basic Transaction Tracker
- Add income/expense transactions
- View all transactions in a list
- Edit and delete transactions

### ✅ Stage 2: Dashboard & Charts
- Category-wise Pie Chart (Recharts)
- Monthly Line Chart for trends
- Clean and responsive dashboard layout

### ✅ Stage 3: Budgeting & Insights
- Set monthly budgets by category
- Compare actual vs. budget with bar chart
- Smart insights like over-budget detection
- Top spending category display

---

## 🛠 Tech Stack

### Frontend
- [Next.js (App Router)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/en-US/)

### Backend
- Node.js (Next.js API routes)
- Prisma ORM
- PostgreSQL (via Docker)
- Redis (optional for caching/future use)

---

## ⚙️ Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/akshitkuma/finsight-tracker.git
cd finsight
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root:

```
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/finsight"
REDIS_URL="redis://localhost:6379"
```

### 4. Run PostgreSQL and Redis (via Docker)

```bash
docker-compose up -d
```

### 5. Setup the Database with Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 6. Start the Development Server

```bash
npm run dev
```

Now visit [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
finsight/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── api/
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
├── docker-compose.yml
├── .env
├── tailwind.config.ts
├── README.md
└── package.json
```

---

## ✨ Credits

<<<<<<< HEAD
- Developed by [Your Name](https://github.com/akshitkuma)
=======
- Developed by [Akshit Kumar](https://github.com/akshitkuma)
>>>>>>> fa29674d028c50434c4a0d805d5b753d1059d3b5
- Icons: [Heroicons](https://heroicons.com/)
- Charts: [Recharts](https://recharts.org/)

---

## 📩 Contact
<<<<<<< HEAD

For questions or feedback, reach out via GitHub or email at kakshit257@gmail.com

---

## 🏁 Submission Stage

✅ **Stage 3 Completed**  
🟢 Full Features Implemented  
🏆 Ready for Evaluation

---
=======

For questions or feedback, reach out via GitHub or email at kakshit257@gmail.com

---

## 🏁 Submission Stage

✅ **Stage 3 Completed**  
🟢 Full Features Implemented  
🏆 Ready for Evaluation

---

>>>>>>> fa29674d028c50434c4a0d805d5b753d1059d3b5
