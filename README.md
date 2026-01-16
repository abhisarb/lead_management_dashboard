# LeadFlow - Mini CRM Dashboard

A modern, full-stack Lead Management Dashboard built with React, Node.js, and MongoDB.

## Features
- **Analytics Dashboard**: View key metrics like total leads, conversion rates, and lead sources.
- **Leads Management**: Interactive table with server-side pagination, search, and status filtering.
- **Lead Details**: Detailed view of individual leads with contact info and notes.
- **Responsive Design**: Premium UI that works on both desktop and mobile devices.
- **Mock Authentication**: Secure login screen (Admin demo credentials included).

## Tech Stack
- **Frontend**: React (Vite), Recharts, Lucide-React, Axios.
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB (Atlas).
- **Styling**: Vanilla CSS (Modern design systems).

## Setup Instructions

### 1. Prerequisites
- Node.js installed
- MongoDB Atlas account (Free tier)

### 2. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your `MONGODB_URI`.
4. Run the seeding script to generate 500 dummy leads:
   ```bash
   npm run seed
   ```
5. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Demo Credentials
- **Email**: `admin@crm.com`
- **Password**: `admin123`

## Environment Variables
- `MONGODB_URI`: Your MongoDB connection string.
- `PORT`: Server port (default: 5000).

## Deployment
- **Backend**: Can be deployed to Render, Railway, or Heroku.
- **Frontend**: Can be deployed to Vercel or Netlify.
- **Database**: Use MongoDB Atlas free tier.
