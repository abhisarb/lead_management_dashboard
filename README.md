# LeadFlow - Mini CRM Dashboard

Build a mini CRM-style dashboard using a full-stack approach (React, Node.js, and MongoDB) for a Lead Management assignment.

## 🚀 Live Links
- **Frontend (Live App)**: [https://lead-management-dashboard-smoky.vercel.app](https://lead-management-dashboard-smoky.vercel.app)
- **Backend API**: [https://lead-management-backend-a1k7.onrender.com](https://lead-management-backend-a1k7.onrender.com)
- **GitHub Repository**: [https://github.com/abhisarb/lead_management_dashboard](https://github.com/abhisarb/lead_management_dashboard)

## 🔑 Demo Credentials
- **Email**: `admin@crm.com`
- **Password**: `admin123`

---

## 📖 Features
- **Analytics Dashboard**: Real-time metrics including Total Leads, Converted Leads, Pipeline Value, and Conversion Rate.
- **Leads Management**: 
  - Server-side **Search** (Full Name & Email).
  - Server-side **Filtering** (By Lead Status).
  - Server-side **Pagination**.
  - Server-side **Sorting** (By Created Date).
- **Lead Details**: Detailed profile view for each lead with contact info, source, value, and internal notes.
- **Mobile Responsive**: Built with a premium, responsive Vanilla CSS design system.
- **Authentication**: Basic mock authentication for secure access.

---

## 🛠️ Technology Stack
- **Frontend**: React (Vite), Recharts (Analytics), Lucide-React (Icons), Axios.
- **Backend**: Node.js, Express.js, Mongoose.
- **Database**: MongoDB Atlas (Free Tier).
- **Styling**: Vanilla CSS (Modern design patterns, glassmorphism, fluid animations).

---

## ⚙️ Environment Variables

### Backend (`/backend/.env`)
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### Frontend (`/frontend/.env` or Vercel Settings)
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## 🏗️ Local Setup Instructions

### 1. Backend Setup
1. Navigate to the `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file and add your `MONGODB_URI`.
4. **Seeding Method**: Generate 500 dummy leads by running:
   ```bash
   npm run seed
   ```
5. Start the server: `npm start`

### 2. Frontend Setup
1. Navigate to the `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`

---

## ☁️ Deployment Details
- **Frontend**: Deployed on **Vercel** with the `VITE_API_URL` environment variable pointing to the Render backend.
- **Backend**: Deployed on **Render** as a Web Service.
- **Database**: Hosted on **MongoDB Atlas** with IP 0.0.0.0/0 whitelisted.
